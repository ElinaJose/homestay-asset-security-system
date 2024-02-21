# homestay-asset-security-system
Project demonstration: https://www.youtube.com/watch?v=O2LjaI7hBpM

Follow these steps if you want to recreate Homestay Asset Security System (HASS):
1) This video is my primary source for making this project as it teaches me how to connect RFID and ESP8266 with Google Sheet: https://www.youtube.com/watch?v=Bgs_3F5rL5Q
2) Follow up with this video if you want to use 2 RFID readers like I did: https://www.youtube.com/watch?v=S3DmT-LmKug&t=199s
3) The coding you need from this HASS folder:
   a) Code.gs = Codes in the Google App Script
   b) hass-backdoor = Arduino codes for the homestay's backdoor asset detection
   c) hass-house_door = Arduino codes for the homestay's front door asset detection
4) I added improvements to this project by enhancing the functionality of IoT in it. There are 2 outputs from HASS which are daily generated email report AND telegram message.
5) In the Code.gs of Google App Script, please add your email address to the function sendEmail(). Next, scroll on the left menu and select Triggers and add your trigger events.
   ![image](https://github.com/ElinaJose/homestay-asset-security-system/assets/82617845/75f2fe1c-3a57-4337-85ab-b713056fbb4c)
6) Create your own Telegram bot. You can find many tutorials from Youtube.
7) Now, for Telegram I was using Zapier for automated Telegram message every time an asset affixed with RFID tag passes through the RFID reader. I figured that ESP8266 does not have the capacity to send data simultaneously to two locations: Google Sheet and Telegram. So this is where using a webhook can benefit us. Webhook = Good Stuff for automated tasks between different applications (in our case, we want a new row being added to Google Sheet to trigger Telegram message).
8) Build your own Zapier dashboard.
9) You can also add some data analytics / visualization to the Google Sheet so that the daily generated email security report looks more interesting.
10) That's it. Good luck!
   

Got some errors? These tips might give you some clues on what you were doing wrong:
1) Don't forget to download your libraries on Arduino IDE!
2) Please observe the wiring for RFID and ESP8266 from Github RFID RC522 official documentation. 
3) On your Arduino IDE, select Tools > Board > esp8266 > NodeMCU 1.0 (ESP-12E Module) and select the correct port too.
4) Make sure you go through all the steps shown in the video from Step 1. Adjust the codes accordingly.
5) Ensure you are using the same sensors and hardware components. E.g: ESP32 will not work for this project.
6) The spreadsheet ID and deployment ID are two DIFFERENT things.
