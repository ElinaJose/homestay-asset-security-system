//  Spreadsheet ID here
var SS = SpreadsheetApp.openById('Your-Spreadsheet-ID-Here');
var timezone = "Asia/Kuala_Lumpur"; //change this if you are residing in other country
var hours = 0;
var str = "";

function doPost(e) {

  var parsedData;
  ///////////////////
  var result = {};
  
  try { 
    parsedData = JSON.parse(e.postData.contents);
  } 
  catch(f){
    return ContentService.createTextOutput("Error in parsing request body: " + f.message);
  }
   
  if (parsedData !== undefined){
    var flag = parsedData.format;
    if (flag === undefined){
      flag = 0;
    }
    
    var sheet = SS.getSheetByName(parsedData.sheet_name); // sheet name to publish data to is specified in Arduino code
    var dataArr = parsedData.values.split(","); // creates an array of the values to publish 
         
    var Curr_Date = Utilities.formatDate(new Date(), timezone, "dd/MM/yyyy"); // gets the current date
    var Curr_Time = Utilities.formatDate(new Date(), timezone, "hh:mm:ss a"); // gets the current time
    //var Curr_Date = new Date(new Date().setHours(new Date().getHours() + hours));
    //var Curr_Time = Utilities.formatDate(Curr_Date, timezone, 'HH:mm:ss');

    // comming from Arduino code;
    var value0 = dataArr [0];  //Product ID
    var value1 = dataArr [1];  //Product Name
    var value2 = dataArr [2];  //Category
    var value3 = dataArr [3];  //SKU Number
    var value4 = dataArr [4];  //Brand
    var value5 = dataArr [5];  //Door name
  
    //------------------------------------------------------------------------------------------------------
    
    //coding for adding new row to the most bottom in Google Sheet
    var lastRow = sheet.getLastRow();

    //------------------------------------------------------------------------------------------------------    
    
    // read and execute command from the "payload_base" string specified in Arduino code
    switch (parsedData.command) {
      
      case "insert_row":
         
         // Insert a new row below the last row with data
        sheet.insertRows(lastRow + 1);

        sheet.getRange('A' + (lastRow + 1)).setValue(value0);    // PRODUCT ID
        sheet.getRange('B' + (lastRow + 1)).setValue(Curr_Time); // TIME
        sheet.getRange('C' + (lastRow + 1)).setValue(value5);    // GATE NUMBER
        sheet.getRange('D' + (lastRow + 1)).setValue(Curr_Date); // DATE
        sheet.getRange('E' + (lastRow + 1)).setValue(value1);    // PRODUCT NAME
        sheet.getRange('F' + (lastRow + 1)).setValue(value2);    // CATEGORY
        sheet.getRange('G' + (lastRow + 1)).setValue(value3);    // SKU NUMBER
        sheet.getRange('H' + (lastRow + 1)).setValue(value4);    // BRAND
         
         str = "Success"; // string to return back to Arduino serial console
         SpreadsheetApp.flush();
         break;
         
      case "append_row":
         
         var publish_array = new Array(); // create a new array
         
         publish_array [0] = value0;    // publish PRODUCT ID to cell A2
         publish_array [1] = Curr_Time; // publish Time to cell B2
         publish_array [2] = Curr_Date; // publish current date to cell D2
         publish_array [3] = value1;    // publish PRODUCT Name cell E2
         publish_array [4] = value2;    // publish CATEGORY cell F2
         
         sheet.appendRow(publish_array); // publish data in publish_array after the last row of data in the sheet
         
         str = "Success"; // string to return back to Arduino serial console
         SpreadsheetApp.flush();
         break;     
         
    }
    return ContentService.createTextOutput(str);
  } // endif (parsedData !== undefined)
  
  else {
    return ContentService.createTextOutput("Error! Request body empty or in incorrect format.");
  }
}

function sendEmail() {
  var message = {
    to: "Homestay-Owners-Email-Address",
    subject: "[Urgent] Check Google Sheet for Asset Activity",
    body: "Quick heads up - our homestay asset security system has picked up some activity. To get the details, please take a moment to check the Google Sheet and attached with this email is the security report already downloaded for you.",
    name: "auto-generated email",
    attachments: [SpreadsheetApp.getActiveSpreadsheet().getAs(MimeType.PDF).setName("Homestay Asset Security System Report")]
  };
  MailApp.sendEmail(message);
}


