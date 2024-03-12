package com.bitc.fs501.final_team2.service;

import com.bitc.fs501.final_team2.dto.UserDTO;

import java.util.List;
import java.util.Map;

public interface UserService {

    /*회원 목록*/
    List<UserDTO> userList() throws Exception;

    /*회원 삭제*/
    void deleteUser(int userIdx) throws Exception;

    void updateSubdate(UserDTO user) throws Exception;

    UserDTO findUserById(String userId) throws Exception;

    List<String> userLevel() throws Exception;

    List<String> userEmail(String userLevel) throws Exception;

    void signUp(UserDTO userDTO) throws Exception;
    boolean login(UserDTO userDto) throws Exception;

    List<UserDTO> selectAllUsers() throws Exception;

    int isUserInfo(String userId, String userPassword) throws Exception;

    UserDTO findByUserId(String userId) throws Exception;

    //구매일자 등록
    void updateUserSubdate(Map<String, Object> paramMap) throws Exception;

    //구독
    List<UserDTO> findAndRetryPayments(String formattedCurrentDateTime) throws Exception;

    //등급 업데이트
    void updateUserLevel(Map<String, Object> paramMap) throws Exception;

    UserDTO findByUserIdx(int userIdx) throws Exception;

    void updateUserLevel(String userId, String userLevel);
}