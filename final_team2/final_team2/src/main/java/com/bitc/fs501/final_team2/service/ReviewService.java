package com.bitc.fs501.final_team2.service;

import com.bitc.fs501.final_team2.dto.ReviewDto;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ReviewService {
    List<ReviewDto> getAllReviews();
    ReviewDto getReviewById(int revIdx);
    void addReview(ReviewDto rev, List<MultipartFile> files) throws Exception;
    void updateReview(ReviewDto review);
    void deleteReview(int revIdx) throws Exception;
    List<ReviewDto> getReviewsByWineId(int wineId, int start, int pageSize);

    int getTotalReviewsByWineId(int id);

    List<ReviewDto> myReviews(int userIdx) throws Exception;

    void increaseReviewCount(int revIdx) throws Exception;

//    List<ReviewDto> getReviewsByUserIdx(int userIdx, int start, int pageSize);
//
//    int getTotalReviewsByUserIdx(int userIdx);
}