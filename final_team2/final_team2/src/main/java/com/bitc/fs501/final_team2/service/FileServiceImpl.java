package com.bitc.fs501.final_team2.service;

import com.bitc.fs501.final_team2.mapper.FileMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FileServiceImpl implements FileService{
    @Autowired
    private FileMapper fileMapper;
    @Override
    public void deleteFile(int revIdx) throws Exception {
        fileMapper.deleteFile(revIdx);
    }
}
