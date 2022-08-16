package at.htl;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class CSVRepository {
    public List<String> readCSV() throws FileNotFoundException {
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


}
