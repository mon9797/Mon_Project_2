package com.bitc.fs501.final_team2.controller;

import com.bitc.fs501.final_team2.dto.WineInfoDto;
import com.bitc.fs501.final_team2.service.WineService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

// CORS 에러 : 서로 다른 출처를 가지고 있는 상태에서 리소스를 요청하게 되면 브라우저에서 보안상의 이유로 리소스를 차단함
// @CrossOrigin : CORS 오류 발생 시 외부 서버의 접속을 허용하는 어노테이션

//@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4000"})
@RequiredArgsConstructor
@RestController

public class WineController {

    private final WineService wineService;

    //전체 게시글 목록 가져오기
    @GetMapping({"/board", "/board/"})
    public Object selectWineList() throws Exception {
        List<WineInfoDto> wineList = wineService.selectWineList();

        Map<String, Object> result = new HashMap<>();
        result.put("result", "success");
        result.put("data", wineList);

        return result;
    }

    // 와인타입별 목록 가져오기
    @GetMapping("/{wineType}")
    public Object typeWineList(@PathVariable String wineType) throws Exception {
        List<WineInfoDto> typeWineList = wineService.typeWineList(wineType);

        Map<String, Object> result = new HashMap<>();
        result.put("result", "success");
        result.put("data", typeWineList);
        System.out.println(typeWineList);

        return result;
    }

    //    와인정보 확인
    @GetMapping("/wine/{id}")
    public WineInfoDto getWineDetail(@PathVariable int id) throws Exception {
        return wineService.getWineDetail(id);
    }

    // 검색 목록 가져오기
    @GetMapping("/search/{searchStr}")
    public Object searchList(@PathVariable String searchStr) throws Exception {
        List<WineInfoDto> searchList = wineService.searchList(searchStr);

        Map<String, Object> result = new HashMap<>();
        result.put("result", "success");
        result.put("data", searchList);
        System.out.println(searchList);

        return result;
    }

}
