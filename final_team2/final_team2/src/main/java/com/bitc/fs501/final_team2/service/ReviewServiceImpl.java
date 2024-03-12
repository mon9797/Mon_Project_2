package com.bitc.fs501.final_team2.service;

import com.bitc.fs501.final_team2.dto.FileDTO;
import com.bitc.fs501.final_team2.dto.ReviewDto;
import com.bitc.fs501.final_team2.mapper.FileMapper;
import com.bitc.fs501.final_team2.mapper.ReviewMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewMapper reviewMapper;
    private final FileMapper fileMapper;

    @Value("${file.upload-dir}")
    private String uploadDir;



    @Override
    public List<ReviewDto> getAllReviews() {
        return reviewMapper.getAllReviews();
    }

    @Override
    public ReviewDto getReviewById(int revIdx) {
        return reviewMapper.getReviewById(revIdx);
    }

    @Override
    public void addReview(ReviewDto rev, List<MultipartFile> files) throws Exception {
        reviewMapper.addReview(rev);
        System.out.println(rev.getRevIdx());
        if (files != null && !files.isEmpty()) {
            for (int i = 0; i < files.size(); i++) { // 리스트의 각 파일에 대해 처리
                MultipartFile file = files.get(i);
                String originalFilename = file.getOriginalFilename();
                String extension = originalFilename.substring(originalFilename.lastIndexOf(".")); // 파일 확장자 추출
                String storedFilename = rev.getRevIdx() + "_" + i + extension; // revIdx와 파일의 인덱스, 확장자를 결합하여 파일 이름 생성

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
                fileDTO.setRevIdx(rev.getRevIdx());
                fileDTO.setOFile(originalFilename);
                fileDTO.setSFile(storedFilename);

                fileMapper.revInsertFile(fileDTO); // 파일 정보 삽입
            }
        }
    }


    @Override
    public void updateReview(ReviewDto review) {
        reviewMapper.updateReview(review);
    }

    @Override
    public void deleteReview(int revIdx) throws Exception {
        Integer fileIdx = reviewMapper.getFileInfo(revIdx);
        if (fileIdx != null) {
            fileMapper.deleteFile(fileIdx);
        }
        reviewMapper.deleteReview(revIdx);
    }

    @Override
    public List<ReviewDto> getReviewsByWineId(int wineId, int start, int pageSize) {
        return reviewMapper.getReviewsByWineId(wineId, start, pageSize);
    }

    @Override
    public int getTotalReviewsByWineId(int id) {
        return reviewMapper.getTotalReviewsByWineId(id);
    }

    @Override
    public List<ReviewDto> myReviews(int userIdx) throws Exception {
        return reviewMapper.myReviews(userIdx);
    }

    @Override
    public void increaseReviewCount(int revIdx) throws Exception {
        reviewMapper.increaseReviewCount(revIdx);
    }

//    @Override
//    public List<ReviewDto> getReviewsByUserIdx(int userIdx, int start, int pageSize) {
//        return reviewMapper.getReviewsByUserIdx(userIdx, start, pageSize);
//    }
//
//    @Override
//    public int getTotalReviewsByUserIdx(int userIdx) {
//        return reviewMapper.getTotalReviewsByUserIdx(userIdx);
//    }
}