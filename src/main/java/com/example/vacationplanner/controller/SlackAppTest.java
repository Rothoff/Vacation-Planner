/*package com.example.vacationplanner.controller;

import com.github.seratch.jslack.Slack;
import com.github.seratch.jslack.api.webhook.Payload;
import com.github.seratch.jslack.api.webhook.WebhookResponse;

public class SlackAppTest {

    private static String webHook = "https://hooks.slack.com/services/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";
    private static String token = "xoxb-4456799495537-4444085911443-v7MOmbpZCp1E0qgH8wtkgcVA";
    private static String SlackChannel = "vacation";


public static void main(String[]args){
    SendSlackMessage("First Message To Slack Using Automation");
        }
        public static void SendSlackMessage(String message){
        try {
            StringBuilder msgBuilder = new StringBuilder();
            msgBuilder.append(message);

            Payload payload = Payload.builder().channel(SlackChannel).text(msgBuilder.toString()).build();

            WebhookResponse webResp = Slack.getInstance().send(webHook, payload);
        }catch (Exception e) {
            e.printStackTrace();
        }
    }
}*/
