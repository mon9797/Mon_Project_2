package com.bitc.fs501.final_team2.controller;

import com.bitc.fs501.final_team2.dto.OrderHistoryDto;
import com.bitc.fs501.final_team2.dto.UserDTO;
import com.bitc.fs501.final_team2.dto.WineInfoDto;
import com.bitc.fs501.final_team2.service.OrderHistoryService;
import com.bitc.fs501.final_team2.service.UserService;
import com.bitc.fs501.final_team2.service.WineService;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.exception.IamportResponseException;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class PaymentController {

    @Value("${iamport.key}")
    private String restApiKey;
    @Value("${iamport.secret}")
    private String restApiSecret;

    private IamportClient iamportClient;

    @PostConstruct
    public void init() {
        this.iamportClient = new IamportClient(restApiKey, restApiSecret);
    }

    @Autowired
    private OrderHistoryService orderHistoryService;

    @Autowired
    private UserService userService;

    @Autowired
    private WineService wineService;

    @PostMapping("/verifyIamport/{imp_uid}")
    public IamportResponse<Payment> paymentByImpUid(
            @PathVariable("imp_uid") String imp_uid,
            @RequestBody Map<String, Object> requestData) throws Exception {

        IamportResponse<Payment> response = iamportClient.paymentByImpUid(imp_uid);

        if (response.getResponse() != null && response.getResponse().getAmount() != null &&
                response.getResponse().getStatus().equals("paid")) {

            // 요청 데이터에서 필요한 정보 추출
            Integer userIdx = (Integer) requestData.get("userIdx");
            List<Map<String, Object>> cartItems = (List<Map<String, Object>>) requestData.get("cartItems");

            for (Map<String, Object> item : cartItems) {
                Integer wineId = (Integer) item.get("id");
                Integer hisQuantity = (Integer) item.get("quantity");

                UserDTO user = userService.findByUserIdx(userIdx);

                if (user != null) {
                    LocalDateTime currentDateTime = LocalDateTime.now();
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                    String formattedCurrentDateTime = currentDateTime.format(formatter);

                    OrderHistoryDto orderHistoryDto = new OrderHistoryDto();
                    orderHistoryDto.setUserIdx(userIdx);
                    orderHistoryDto.setId(wineId);
                    orderHistoryDto.setHisQuantity(hisQuantity);

                    orderHistoryService.OrderHistory(orderHistoryDto);

                    WineInfoDto wineInfoDto = new WineInfoDto();
                    wineInfoDto.setId(wineId);
                    wineInfoDto.setHisQuantity(hisQuantity);

                    try {
                        wineService.increaseSalesRate(wineInfoDto);
                        System.out.println("increaseSalesRate 메서드 호출 성공");
                        System.out.println("wineInfoDto: " + wineInfoDto);
                    } catch (Exception e) {
                        e.printStackTrace();
                        // 예외 처리 로직 추가
                    }

                    user.setUserSubdate(formattedCurrentDateTime);
                }
            }
        } else {
            // 결제가 실패한 경우, 해당 로직을 추가하세요
        }

        return response;
    }
}