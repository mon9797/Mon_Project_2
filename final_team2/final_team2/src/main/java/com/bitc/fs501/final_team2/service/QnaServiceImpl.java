package com.bitc.fs501.final_team2.service;

import com.bitc.fs501.final_team2.dto.FileDTO;
import com.bitc.fs501.final_team2.dto.QnaDTO;
import com.bitc.fs501.final_team2.mapper.FileMapper;
import com.bitc.fs501.final_team2.mapper.QnaMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Value;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class QnaServiceImpl implements QnaService {

    private final QnaMapper qnaMapper;
    private final FileMapper fileMapper;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Override
    public List<QnaDTO> qnaList() throws Exception {
        return qnaMapper.qnaList();
    }

    @Override
    public QnaDTO qnaDetail(int inqIdx) throws Exception {
        return qnaMapper.qnaDetail(inqIdx);
    }

    @Override
    public void qnaInsert(QnaDTO qna, List<MultipartFile> files) throws Exception {
        qnaMapper.qnaInsert(qna); // Qna 정보를 먼저 삽입

        if (files != null && !files.isEmpty()) {
            for (int i = 0; i < files.size(); i++) { // 리스트의 각 파일에 대해 처리
                MultipartFile file = files.get(i);
                String originalFilename = file.getOriginalFilename();
                String extension = originalFilename.substring(originalFilename.lastIndexOf(".")); // 파일 확장자 추출
                String storedFilename = qna.getInqIdx() + "_" + i + extension; // inqIdx와 파일의 인덱스, 확장자를 결합하여 파일 이름 생성

                Path uploadPath = Paths.get(uploadDir);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath); // 폴더 생성
                }

                try (FileOutputStream fos = new FileOutputStream(uploadDir + File.separator + storedFilename)) {
                    FileCopyUtils.copy(file.getInputStream(), fos);
                } catch (IOException e) {
                    throw new IOException("Could not store file " + originalFilename + ". Please try again!", e);
                }

                FileDTO fileDTO = new FileDTO();
                fileDTO.setInqIdx(qna.getInqIdx()); // Q&A 인덱스 설정
                fileDTO.setOFile(originalFilename);
                fileDTO.setSFile(storedFilename);

                fileMapper.qnaInsertFile(fileDTO); // 파일 정보 삽입
            }
        }
    }

    @Override
    public List<QnaDTO> myInquiry(String userId) throws Exception {
        return qnaMapper.myInquiry(userId);
    }

    @Override
    public void qnaCommentInsert(QnaDTO qna) throws Exception {
        qnaMapper.qnaCommentInsert(qna);
    }
}