package com.bitc.fs501.final_team2.controller;


import com.bitc.fs501.final_team2.dto.QnaDTO;
import com.bitc.fs501.final_team2.dto.ReviewDto;
import com.bitc.fs501.final_team2.service.QnaService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class QnaController {

    private final QnaService qnaService;

    @GetMapping({"/qna", "/qna/"})
    public Object qnaList() throws Exception {
        List<QnaDTO> qnaList = qnaService.qnaList();

        Map<String, Object> result = new HashMap<>();
        result.put("result", "success");
        result.put("data", qnaList);

        return result;
    }

    @PostMapping("/qna/write")
    public Object qnaInsert(@RequestParam(value = "userId") String userId,
                            @RequestParam(value = "inqTitle") String inqTitle,
                            @RequestParam(value = "inqContent") String inqContent,
                            @RequestParam(value = "files", required = false) List<MultipartFile> files) throws Exception {
        QnaDTO qna = new QnaDTO();
        qna.setUserId(userId);
        qna.setInqTitle(inqTitle);
        qna.setInqContent(inqContent);

        qnaService.qnaInsert(qna, files);
        // 파일이 있는 경우에만 qnaService.qnaInsert 메서드를 호출
//        if (files != null && !files.isEmpty()) {
//            qnaService.qnaInsert(qna, files);
//        }

        Map<String, Object> result = new HashMap<>();
        result.put("result", "success");
        result.put("message", "Q&A inserted successfully.");

        return result;
    }

    //    내가 작성한 문의글만 불러오기
    @GetMapping("/qna/{userId}")
    public Object myInquiry(@PathVariable String userId) throws Exception {
        List<QnaDTO> myInquiry = qnaService.myInquiry(userId);

        Map<String, Object> result = new HashMap<>();
        result.put("result", "success");
        result.put("data", myInquiry);

        return result;
    }
}
