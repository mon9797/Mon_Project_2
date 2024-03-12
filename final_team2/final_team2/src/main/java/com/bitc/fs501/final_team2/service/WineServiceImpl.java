package com.bitc.fs501.final_team2.service;

import com.bitc.fs501.final_team2.dto.WineInfoDto;
import com.bitc.fs501.final_team2.mapper.WineMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class WineServiceImpl implements WineService {

    private final WineMapper wineMapper;

    @Override
    public List<WineInfoDto> selectWineList() throws Exception {
        return wineMapper.selectWineList();
    }

    @Override
    public List<WineInfoDto> typeWineList(String wineType) throws Exception {
        return wineMapper.typeWineList(wineType);
    }

    @Override
    public WineInfoDto getWineDetail(int id) throws Exception {
        return wineMapper.getWineDetail(id);
    }

    @Override
    public List<WineInfoDto> searchList(String searchStr) throws Exception {
        return wineMapper.searchList(searchStr);
    }

    @Override
    public void wineInsert(WineInfoDto wine) throws Exception {
        wineMapper.wineInsert(wine);
    }

    @Override
    public void salesRate(WineInfoDto wine) throws Exception {
        wineMapper.salesRate(wine);
    }

    @Override
    public void increaseSalesRate(WineInfoDto wineInfoDto) throws Exception {
        try {
            wineMapper.increaseSalesRate(wineInfoDto);
        } catch (Exception e) {
            throw new Exception("Failed to increase sales rate.", e);
        }
    }
}
