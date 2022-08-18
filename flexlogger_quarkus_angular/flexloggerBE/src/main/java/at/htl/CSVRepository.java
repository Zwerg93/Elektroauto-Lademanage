package at.htl;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class CSVRepository {
    public List<String> readCSV2() throws FileNotFoundException {
        List<String> csvList = new ArrayList<>();
        File getCSVFiles = new File("D:\\Teresa\\Diplomarbeit\\Elektroauto-Lademanager\\flexlogger_quarkus_angular\\flexloggerBE\\src\\test\\data2.csv");
        Scanner sc = new Scanner(getCSVFiles);
        sc.useDelimiter(",");
        while (sc.hasNext()) {
            csvList.add(sc.next());
            System.out.print(sc.next() + " | ");
        }
        sc.close();
        return csvList;
        //return null;
    }

    public List<LogTable> readCSV() throws FileNotFoundException {
        List<LogTable> csvList = new ArrayList<>();
        List<String> tempList = new ArrayList<>();
        File getCSVFiles = new File("D:\\Teresa\\Diplomarbeit\\Elektroauto-Lademanager\\flexlogger_quarkus_angular\\flexloggerBE\\src\\test\\data2.csv");
        Scanner sc = new Scanner(getCSVFiles);
        sc.useDelimiter(",");
        int counter = 0;
        while (sc.hasNext()) {
            if(counter == 4){
                counter = 0;
                //LogTable tempEntryLog = new LogTable(tempList.get(0), tempList.get(1), tempList.get(2), tempList.get(3));
                //csvList.add(tempEntryLog);
                //tempEntryLog = null;
                tempList.clear();
            } else{
                tempList.add(sc.next());
                counter++;
            }
            //System.out.print(sc.next() + " | ");

        }
        sc.close();
        System.out.println(csvList.get(15).dpId);
        return csvList;
    }


}
