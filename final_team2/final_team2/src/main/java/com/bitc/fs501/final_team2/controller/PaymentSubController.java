package com.bitc.fs501.final_team2.controller;

import com.bitc.fs501.final_team2.dto.UserDTO;
import com.bitc.fs501.final_team2.service.UserService;
import com.siot.IamportRestClient.IamportClient;
import com.siot.IamportRestClient.response.IamportResponse;
import com.siot.IamportRestClient.response.Payment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@RestController
public class PaymentSubController {

    @Value("${iamport.key}")
    private String restApiKey;
    @Value("${iamport.secret}")
    private String restApiSecret;

    private final IamportClient iamportClient;

    @Autowired
    private UserService userService;

    public PaymentSubController(@Value("${iamport.key}") String restApiKey, @Value("${iamport.secret}") String restApiSecret) {
        this.restApiKey = restApiKey;
        this.restApiSecret = restApiSecret;
        this.iamportClient = new IamportClient(restApiKey, restApiSecret);
    }

    @PostMapping("/verifySubIamport/{imp_uid}/{userId}/{level}")
    public IamportResponse<Payment> subscriptionPaymentByImpUid(@PathVariable("imp_uid") String imp_uid, @PathVariable("userId") String userId, @PathVariable("level") String level) throws Exception {
        IamportResponse<Payment> response = iamportClient.paymentByImpUid(imp_uid);

        if (response.getResponse() != null && response.getResponse().getAmount() != null && response.getResponse().getStatus().equals("paid")) {
            // 결제가 성공하고, 결제 정보와 사용자 ID가 제대로 전달된 경우
            UserDTO user = userService.findByUserId(userId);
            if (user != null) {
                // 사용자가 존재하는 경우
                LocalDateTime currentDateTime = LocalDateTime.now();
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                String formattedCurrentDateTime = currentDateTime.format(formatter);

                Map<String, Object> paramMap = new HashMap<>();
                paramMap.put("userId", user.getUserId());
                paramMap.put("userSubdate", formattedCurrentDateTime);
                paramMap.put("userLevel", level); // 새로운 필드 추가

// 사용자 정보 업데이트
                userService.updateUserLevel(paramMap);
            }
        } else {

        }

        return response;
    }
}
