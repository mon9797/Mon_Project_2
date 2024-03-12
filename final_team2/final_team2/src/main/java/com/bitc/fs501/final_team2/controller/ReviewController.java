package com.bitc.fs501.final_team2.controller;

import com.bitc.fs501.final_team2.dto.FileDTO;
import com.bitc.fs501.final_team2.dto.ReviewDto;
import com.bitc.fs501.final_team2.service.FileService;
import com.bitc.fs501.final_team2.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    private final ReviewService reviewService;


    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/wine/{id}")
    public ResponseEntity<Map<String, Object>> getReviewsByWineId(
            @PathVariable int id,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "5") int pageSize
    ) {
        Map<String, Object> response = new HashMap<>();
        int start = (page -1) * pageSize;

        int totalReviews = reviewService.getTotalReviewsByWineId(id);

        int totalPages = (int) Math.ceil((double) totalReviews / pageSize);

        List<ReviewDto> reviews = reviewService.getReviewsByWineId(id, start, pageSize);

        response.put("reviews", reviews);
        response.put("currentPage", page);
        response.put("totalPages", totalPages);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/reviewCnt/{revIdx}")
    public void increaseReviewCount(@RequestParam(value = "revIdx") int revIdx) throws Exception{
        reviewService.increaseReviewCount(revIdx);
    }

    @PostMapping("/add")
    public Object addReview(@RequestParam(value = "id") int id,
                            @RequestParam(value = "userIdx") int userIdx,
                            @RequestParam(value = "revTitle") String revTitle,
                            @RequestParam(value = "revContent") String revContent,
                            @RequestParam(value = "revRating") int revRating,
                            @RequestParam(value = "files", required = false) List<MultipartFile> files) throws Exception{
        System.out.println(id);
        ReviewDto rev = new ReviewDto();
        rev.setId(id);
        rev.setUserIdx(userIdx);
        rev.setRevTitle(revTitle);
        rev.setRevContent(revContent);
        rev.setRevRating(revRating);

        reviewService.addReview(rev, files);
//        if (files != null && !files.isEmpty()){
//            reviewService.addReview(rev, files);
//        }

        Map<String, Object> result = new HashMap<>();
        result.put("result","success");
        result.put("message","리뷰 작성 성공");

        return result;
    }

//    내가 작성한 리뷰만 불러오기
    @GetMapping("/{userIdx}")
    public Object myReviews(@PathVariable int userIdx) throws Exception {
        List<ReviewDto> myReviews = reviewService.myReviews(userIdx);

        Map<String, Object> result = new HashMap<>();
        result.put("result", "success");
        result.put("data", myReviews);

        return result;
    }

    @DeleteMapping("/delete/{revIdx}")
    public void reviewDelete(@PathVariable int revIdx) throws Exception{
        reviewService.deleteReview(revIdx);
    }
////    내가 작성한 리뷰만 불러오기
//    @GetMapping("/{userIdx}")
//    public ResponseEntity<Map<String, Object>> getReviewsByUserIdx(
//            @PathVariable int userIdx,
//            @RequestParam(defaultValue = "1") int page,
//            @RequestParam(defaultValue = "5") int pageSize
//    ) {
//        Map<String, Object> response = new HashMap<>();
//        int start = (page -1) * pageSize;
//
//        int totalReviews = reviewService.getTotalReviewsByUserIdx(userIdx);
//
//        int totalPages = (int) Math.ceil((double) totalReviews / pageSize);
//
//        List<ReviewDto> reviews = reviewService.getReviewsByUserIdx(userIdx, start, pageSize);
//
//        response.put("reviews", reviews);
//        response.put("currentPage", page);
//        response.put("totalPages", totalPages);
//
//        return ResponseEntity.ok(response);
//    }
}
