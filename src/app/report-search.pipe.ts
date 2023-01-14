import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reportSearch'
})
export class ReportSearchPipe implements PipeTransform {

  transform(dataContainer: any, fName: any, fAge: any, fReportID: any, fCity: any, fPolice: any): any {

    if (fName == "") {
      console.log("undifined name");

      fName = undefined
    }
    if (fAge == "") {
      console.log("undifined age");

      fAge = undefined
    }
    if (fReportID == "") {
      console.log("undifined report");

      fReportID = undefined
    }
    if (fCity == "" || fCity == "all") {
      console.log("undifined city");

      fCity = undefined
    } if (fPolice == "" || fPolice == "all") {
      console.log("undifined fPolice");

      fPolice = undefined
    }

    //all in-valid
    if (fName == undefined && fAge == undefined && fReportID == undefined && fCity == undefined && fPolice == undefined) {
      return dataContainer;
    }
    //only name valid
    else if (fName && fAge == undefined && fReportID == undefined && fCity == undefined && fPolice == undefined) {
      console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
      return dataContainer.filter(function (dataContainer: any) {
        return dataContainer.name.toLowerCase().includes(fName.toLowerCase())
      })
    }
    //only age  valid 
    else if (fName == undefined && fAge && fReportID == undefined && fCity == undefined && fPolice == undefined) {
      return dataContainer.filter(function (dataContainer: any) {
        return dataContainer.age == fAge;
      })
    }
    //only fReportID  valid 
    else if (fName == undefined && fAge == undefined && fReportID && fCity == undefined && fPolice == undefined) {
      return dataContainer.filter(function (dataContainer: any) {
        return dataContainer._id == fReportID;
      })
    }
    //only fCity
    else if (fName == undefined && fAge == undefined && fReportID == undefined && fCity && fPolice == undefined) {
      return dataContainer.filter(function (dataContainer: any) {
        return dataContainer.lostLocation == fCity;
      })
    }
    //only fpolice
    else if (fName == undefined && fAge == undefined && fReportID == undefined && fCity == undefined && fPolice) {
      return dataContainer.filter(function (dataContainer: any) {
        return dataContainer.policeStationID.userName == fPolice;
      })
    }
    //only name and age valid 
    else if (fName && fAge && fReportID == undefined && fCity == undefined && fPolice == undefined) {
      return dataContainer.filter(function (dataContainer: any) {
        return dataContainer.name.toLowerCase().includes(fName.toLowerCase()) && dataContainer.age == fAge;
      })
    }
    //only name and fReportID valid 
    else if (fName && fAge == undefined && fReportID && fCity == undefined && fPolice == undefined) {
      return dataContainer.filter(function (dataContainer: any) {
        return dataContainer.name.toLowerCase().includes(fName.toLowerCase()) && dataContainer._id.includes(fReportID);
      })

    }//only name and fCity valid 
    else if (fName && fAge == undefined && fReportID == undefined && fCity && fPolice == undefined) {
      return dataContainer.filter(function (dataContainer: any) {
        return dataContainer.name.toLowerCase().includes(fName.toLowerCase()) && dataContainer.lostLocation == fCity;
      })
    }
    //only name and fPolice valid 
    else if (fName && fAge == undefined && fReportID == undefined && fCity == undefined && fPolice) {
      return dataContainer.filter(function (dataContainer: any) {
        return dataContainer.name.toLowerCase().includes(fName.toLowerCase()) && dataContainer.policeStationID.userName == fPolice;
      })
    }
    //only fName && fAge && fReportID  valid 
    else if (fName && fAge && fReportID && fCity == undefined && fPolice == undefined) {
      return dataContainer.filter(function (dataContainer: any) {
        return dataContainer.name.toLowerCase().includes(fName.toLowerCase()) &&
          dataContainer.age == fAge && dataContainer._id.includes(fReportID);
      })
    }//only fName && fAge && fCity  valid 
    else if (fName && fAge && fReportID == undefined && fCity && fPolice == undefined) {
      return dataContainer.filter(function (dataContainer: any) {
        return dataContainer.name.toLowerCase().includes(fName.toLowerCase()) &&
          dataContainer.age == fAge && dataContainer.lostLocation == fCity;
      })
    }  //only fName && fAge && fPolice  valid 
    else if (fName && fAge && fReportID == undefined && fCity == undefined && fPolice) {
      return dataContainer.filter(function (dataContainer: any) {
        return dataContainer.name.toLowerCase().includes(fName.toLowerCase()) &&
          dataContainer.age == fAge && dataContainer.policeStationID.userName == fPolice;
      })
    }
    //only fName && fAge && fReportID  && fCity valid 
    else if (fName == undefined && fAge == undefined && fReportID == undefined && fCity && fPolice) {
      return dataContainer.filter(function (dataContainer: any) {
        return dataContainer.lostLocation == fCity && dataContainer.policeStationID.userName == fPolice;
      })
    }  //only fName && fReportID  && fCity valid 
    else if (fName && fAge == undefined && fReportID == undefined && fCity && fPolice) {
      return dataContainer.filter(function (dataContainer: any) {
        return dataContainer.name.toLowerCase().includes(fName.toLowerCase()) && dataContainer.lostLocation == fCity && dataContainer.policeStationID.userName == fPolice;
      })
    }
    //ropert police city
    else if (fName == undefined && fAge == undefined && fReportID && fCity && fPolice) {
      return dataContainer.filter(function (dataContainer: any) {
        return dataContainer.lostLocation == fCity &&
          dataContainer.policeStationID.userName == fPolice && dataContainer._id == fReportID;
      })
    }
    //city , police
    else if (fName == undefined && fAge == undefined && fReportID == undefined && fCity && fPolice) {
      return dataContainer.filter(function (dataContainer: any) {
        return dataContainer.lostLocation == fCity && dataContainer.policeStationID.userName == fPolice;
      })
    }
    //city , police , age
    else if (fName == undefined && fAge == undefined && fReportID == undefined && fCity && fPolice) {
      return dataContainer.filter(function (dataContainer: any) {
        return dataContainer.lostLocation == fCity &&
          dataContainer.policeStationID.userName == fPolice
          && dataContainer.age == fAge;
      })
    }
    //all valid 
    else if (fName && fAge && fReportID && fCity && fPolice) {
      return dataContainer.filter(function (dataContainer: any) {
        return dataContainer.name.toLowerCase().includes(fName.toLowerCase()) &&
          dataContainer.age == fAge && dataContainer._id.includes(fReportID) &&
          dataContainer.lostLocation == fCity && dataContainer.policeStationID.userName == fPolice;
      })
    }

    //age id, city ,police
    else if (fName == undefined && fAge && fReportID && fCity && fPolice) {
      return dataContainer.filter(function (dataContainer: any) {
        return dataContainer.age == fAge && dataContainer._id.includes(fReportID) &&
          dataContainer.lostLocation == fCity && dataContainer.policeStationID.userName == fPolice;
      })
    }
    //name age , city ,police
    else if (fName && fAge && fReportID == undefined && fCity && fPolice) {

      return dataContainer.filter(function (dataContainer: any) {
        return dataContainer.name.toLowerCase().includes(fName.toLowerCase()) &&
          dataContainer.age == fAge &&
          dataContainer.lostLocation == fCity && dataContainer.policeStationID.userName == fPolice;
      })
    }
    //name id city police
    else if (fName && fAge == undefined && fReportID && fCity && fPolice) {
      return dataContainer.filter(function (dataContainer: any) {
        return dataContainer.name.toLowerCase().includes(fName.toLowerCase())  && dataContainer._id.includes(fReportID) &&
          dataContainer.lostLocation == fCity && dataContainer.policeStationID.userName == fPolice;
      })
    }
    // name id age  city
    else if (fName && fAge && fReportID && fCity && fPolice == undefined) {
      console.log("hjhh");

      return dataContainer.filter(function (dataContainer: any) {
        return dataContainer.name.toLowerCase().includes(fName.toLowerCase()) &&
          dataContainer.age == fAge && dataContainer._id.includes(fReportID) &&
          dataContainer.lostLocation == fCity ;
      })
    }
    // name id age  police
    else if (fName && fAge && fReportID && fCity == undefined && fPolice) {
      return dataContainer.filter(function (dataContainer: any) {
        return dataContainer.name.toLowerCase().includes(fName.toLowerCase()) &&
          dataContainer.age == fAge && dataContainer._id.includes(fReportID)  && dataContainer.policeStationID.userName == fPolice;
      })
    }

    else {
      return dataContainer;
    }


  }

}
