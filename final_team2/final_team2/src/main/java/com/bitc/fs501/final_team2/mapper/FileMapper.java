package com.bitc.fs501.final_team2.mapper;

import com.bitc.fs501.final_team2.dto.FileDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FileMapper {
    void qnaInsertFile(FileDTO fileDTO) throws Exception;

    void revInsertFile(FileDTO fileDTO) throws Exception;

    void deleteFile(int revIdx) throws Exception;

}
