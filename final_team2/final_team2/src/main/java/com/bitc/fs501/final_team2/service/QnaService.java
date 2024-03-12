package com.bitc.fs501.final_team2.service;

import com.bitc.fs501.final_team2.dto.QnaDTO;
import org.apache.ibatis.annotations.Param;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface QnaService {
    List<QnaDTO> qnaList() throws Exception;
    QnaDTO qnaDetail(int inqIdx) throws Exception;
    void qnaInsert(QnaDTO qna, List<MultipartFile> files) throws Exception; // 변경된 메서드 선언

    List<QnaDTO> myInquiry(String userId) throws Exception;

    //QNA 답변 등록
    void qnaCommentInsert(QnaDTO qna) throws Exception;
}
