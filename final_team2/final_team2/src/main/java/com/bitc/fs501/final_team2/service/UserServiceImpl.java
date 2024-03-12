package com.bitc.fs501.final_team2.service;

import com.bitc.fs501.final_team2.dto.QnaDTO;
import com.bitc.fs501.final_team2.dto.UserDTO;
import com.bitc.fs501.final_team2.mapper.FileMapper;
import com.bitc.fs501.final_team2.mapper.QnaMapper;
import com.bitc.fs501.final_team2.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;

    @Override
    public List<UserDTO> userList() throws Exception {
        return userMapper.userList();
    }

    @Override
    public void deleteUser(int userIdx) throws Exception{
        userMapper.deleteUser(userIdx);
    }

    @Override
    public void updateSubdate(UserDTO user) throws Exception {
        userMapper.updateSubdate(user);
    }

    @Override
    public UserDTO findUserById(String userId) throws Exception {
        return userMapper.findUserById(userId);
    }

    @Override
    public List<String> userLevel() throws Exception {
        return userMapper.userLevel();
    }

    @Override
    public List<String> userEmail(String userLevel) throws Exception {
        return userMapper.userEmail(userLevel);
    }

    @Override
    public void signUp(UserDTO userDTO)  throws Exception{
        userMapper.signUp(userDTO);
    }

    @Override
    public boolean login(UserDTO userDto) throws  Exception{
        UserDTO user = userMapper.findByUserId(userDto.getUserId());
        if (user != null && user.getUserPassword().equals(userDto.getUserPassword())) {
            return true; // 로그인 성공
        }
        return false; // 로그인 실패
    }

    @Override
    public List<UserDTO> selectAllUsers() throws Exception {
        return userMapper.selectAllUsers();
    }

    @Override
    public int isUserInfo(String userId, String userPassword) throws Exception {
        return userMapper.isUserInfo(userId,userPassword);
    }

    @Override
    public UserDTO findByUserId(String userId)  throws Exception{
        return userMapper.findByUserId(userId);
    }

    @Override
    public void updateUserSubdate(Map<String, Object> paramMap) throws Exception {
        userMapper.updateUserSubdate(paramMap);
    }

    @Override
    public List<UserDTO> findAndRetryPayments(String formattedCurrentDateTime) throws Exception {
        return userMapper.findAndRetryPayments(formattedCurrentDateTime);
    }

    @Override
    public void updateUserLevel(Map<String, Object> paramMap) throws Exception {
        userMapper.updateUserLevel(paramMap);
    }

    @Override
    public UserDTO findByUserIdx(int userIdx) throws Exception {
        return userMapper.findByUserIdx(userIdx);
    }

    @Override
    public void updateUserLevel(String userId, String userLevel) {
        userMapper.updateUserLevel(userId,userLevel);
    }
}