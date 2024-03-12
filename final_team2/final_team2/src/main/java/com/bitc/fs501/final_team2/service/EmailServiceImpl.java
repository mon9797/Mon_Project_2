package com.bitc.fs501.final_team2.service;

import com.bitc.fs501.final_team2.mapper.UserMapper;
import com.bitc.fs501.final_team2.service.EmailService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.List;
import java.util.Properties;

@Service
public class EmailServiceImpl implements EmailService {

    private final UserMapper userMapper;

    public EmailServiceImpl(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @Override
    @Transactional
    public void sendEmail(String userLevel, String subject, String body) throws Exception {
        // 이메일 발송에 필요한 정보 설정
        Properties properties = new Properties();
        properties.setProperty("mail.smtp.host", "smtp.gmail.com"); // SMTP 서버 호스트 설정
        properties.setProperty("mail.smtp.port", "587"); // TLS 사용 포트 번호 설정
        properties.setProperty("mail.smtp.auth", "true"); // SMTP 인증 사용 설정
        properties.setProperty("mail.smtp.starttls.enable", "true"); // TLS 사용 설정

        // Gmail 계정 정보
        final String username = "thfyd4402@gmail.com"; // Gmail 계정의 사용자 이름
        final String password = "rqea ncdf vang iktu"; // Gmail 계정의 비밀번호

        // SMTP 세션 생성
        Session session = Session.getInstance(properties, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        // 사용자 레벨에 해당하는 이메일 주소 목록 조회
        List<String> userEmails = userMapper.userEmail(userLevel);

        // 각 이메일 주소로 이메일 발송
        for (String userEmail : userEmails) {
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(username));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(userEmail));
            message.setSubject(subject);
            message.setText(body);
            Transport.send(message);
        }
    }
}