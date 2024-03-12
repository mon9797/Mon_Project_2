package com.bitc.fs501.final_team2.mapper;

import com.bitc.fs501.final_team2.dto.UserDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;

@Mapper
public interface UserMapper {
    List<UserDTO> userList() throws Exception;

    void deleteUser(int userIdx) throws Exception;

    void updateSubdate(UserDTO user) throws Exception;

    UserDTO findUserById(String userId) throws Exception;

    List<String> userLevel()throws Exception;

    List<String> userEmail(String userLevel) throws Exception;

    void signUp(UserDTO userDTO) throws Exception;

    UserDTO findByUserId(String userId) throws Exception;

    List<UserDTO> selectAllUsers() throws Exception;

    int isUserInfo(String userId, String userPassword);

    //구매일자 업데이트
    void updateUserSubdate(Map<String, Object> paramMap) throws Exception;

    //구독 결제
    List<UserDTO> findAndRetryPayments(String formattedCurrentDateTime) throws Exception;

    //구독 등급 업데이트
    void updateUserLevel(Map<String, Object> paramMap) throws Exception;

    UserDTO findByUserIdx(int userIdx) throws Exception;

    void updateUserLevel(String userId, String userLevel);
}