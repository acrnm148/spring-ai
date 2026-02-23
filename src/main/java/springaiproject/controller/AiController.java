package springaiproject.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import springaiproject.service.AiService;

@RestController
@RequestMapping("/ai")
@Slf4j
public class AiController {

    @Autowired
    private AiService aiService;

    @PostMapping(
            value = "/chat",
            consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE,
            produces = MediaType.TEXT_PLAIN_VALUE)
    public String chat(@RequestParam("question") String question){
        return "아직 모델과 연결되지 않았습니다.";
    }

    @PostMapping(
            value = "/chat-model",
            consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE,
            produces = MediaType.TEXT_PLAIN_VALUE)
    public String chatModel(@RequestParam("question") String question){
        String answerText = aiService.generateText(question);
        return answerText;
    }
}
