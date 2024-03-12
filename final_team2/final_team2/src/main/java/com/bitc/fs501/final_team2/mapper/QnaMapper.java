package com.bitc.fs501.final_team2.mapper;

import com.bitc.fs501.final_team2.dto.QnaDTO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface QnaMapper {
    List<QnaDTO> qnaList() throws Exception;
    QnaDTO qnaDetail(int inqIdx) throws Exception;
    void qnaInsert(QnaDTO qna) throws Exception;

    List<QnaDTO> myInquiry(String userId) throws Exception;

    //문의 답변 등록
    void qnaCommentInsert(QnaDTO qna) throws Exception;
}
