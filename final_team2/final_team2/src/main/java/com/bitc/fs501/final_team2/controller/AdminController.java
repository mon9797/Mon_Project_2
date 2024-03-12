package com.bitc.fs501.final_team2.controller;

import com.bitc.fs501.final_team2.dto.QnaDTO;
import com.bitc.fs501.final_team2.dto.UserDTO;
import com.bitc.fs501.final_team2.dto.WineInfoDto;
import com.bitc.fs501.final_team2.service.EmailService;
import com.bitc.fs501.final_team2.service.QnaService;
import com.bitc.fs501.final_team2.service.UserService;
import com.bitc.fs501.final_team2.service.WineService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;
    private final EmailService emailService;
    private final QnaService qnaService;
    private final WineService wineService;

    @GetMapping("/user")
    public Object userList() throws Exception {
        List<UserDTO> userList = userService.userList();

        Map<String, Object> result = new HashMap<>();
        result.put("result", "success");
        result.put("data", userList);

        return result;
    }

//    @PutMapping("/{userIdx}/delete")
//    public Object deleteUser(@PathVariable int userIdx) throws Exception {
//        userService.deleteUser(userIdx);
//
//        Map<String, Object> result = new HashMap<>();
//        result.put("result", "success");
//        result.put("message", "회원 탈퇴가 성공적으로 처리되었습니다.");
//
//        return result;
//    }

    @GetMapping("/userLevel")
    public Object userLevel() throws Exception {
        List<String> userLevel = userService.userLevel();

        Map<String, Object> result = new HashMap<>();
        result.put("result", "success");
        result.put("data", userLevel);

        return result;
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendEmail(@RequestBody UserDTO userDTO) {
        try {
            if (userDTO == null || userDTO.getUserLevel() == null || userDTO.getSubject() == null || userDTO.getBody() == null) {
                // 필요한 데이터가 제대로 전달되지 않은 경우
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Request body is invalid");
            }
            String userLevel = userDTO.getUserLevel();
            String subject = userDTO.getSubject();
            String body = userDTO.getBody();
            emailService.sendEmail(userLevel, subject, body);
            return ResponseEntity.ok("이메일이 성공적으로 발송되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("이메일 발송 중 오류가 발생했습니다.");
        }
    }

    @GetMapping("/qnaList")
    public Object qnaList() throws Exception {
        List<QnaDTO> qnaList = qnaService.qnaList();

        Map<String, Object> result = new HashMap<>();
        result.put("result", "success");
        result.put("data", qnaList);

        return result;
    }

    @PostMapping("/qnaComment")
    public Object insertQnaComment(@RequestBody QnaDTO qna) throws Exception {
        qnaService.qnaCommentInsert(qna);

        Map<String, Object> result = new HashMap<>();
        result.put("result", "success");
        result.put("data", "등록되었습니다.");

        return result;
    }

    @PostMapping("/wineInsert")
    public Object wineInsert(@RequestBody WineInfoDto wine) throws Exception {
        wineService.wineInsert(wine);

        Map<String, Object> result = new HashMap<>();
        result.put("result", "success");
        result.put("data", "등록되었습니다");

        return result;
    }

    @PostMapping("/salesrate")
    public Object salesRate(@RequestBody WineInfoDto wine) throws Exception {
        wineService.salesRate(wine);

        Map<String, Object> result = new HashMap<>();
        result.put("result", "success");
        result.put("data", "등록되었습니다");

        return result;
    }
}