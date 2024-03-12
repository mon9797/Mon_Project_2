package com.bitc.fs501.final_team2.controller;

import com.bitc.fs501.final_team2.dto.UserDTO;
import com.bitc.fs501.final_team2.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;


@RestController
@RequestMapping("/user")

public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody UserDTO userDTO) throws Exception{
        userService.signUp(userDTO);
        return ResponseEntity.ok("회원가입 완료");
    }

    @PostMapping("/login")
    public ResponseEntity<UserDTO> login(@RequestBody UserDTO userDTO, HttpSession session) throws Exception {
        if (userService.login(userDTO)) {
            UserDTO userInfo = userService.findByUserId(userDTO.getUserId());
            session.setAttribute("userInfo", userInfo);
            return ResponseEntity.ok(userInfo); // JSON 형식으로 사용자 정보 반환
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

    @PostMapping("/user/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate(); // 세션 무효화
        return ResponseEntity.status(HttpStatus.OK).body("로그아웃 성공");
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserDTO>> selectAllUsers() throws Exception{
        List<UserDTO> users = userService.selectAllUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/{userId}/update-level")
    public ResponseEntity<?> updateUserLevel(@PathVariable String userId, @RequestBody Map<String, String> requestBody) {
        String userLevel = requestBody.get("userLevel");
        userService.updateUserLevel(userId, userLevel);
        return ResponseEntity.ok("User level updated successfully.");
    }

    @PutMapping("/{userIdx}/delete")
    public Object deleteUser(@PathVariable int userIdx) throws Exception {
        userService.deleteUser(userIdx);

        Map<String, Object> result = new HashMap<>();
        result.put("result", "success");
        result.put("message", "회원 탈퇴가 성공적으로 처리되었습니다.");

        return result;
    }
}
