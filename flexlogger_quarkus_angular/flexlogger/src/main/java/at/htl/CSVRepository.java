package at.htl;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class CSVRepository {


    public List<String> readCSV() throws FileNotFoundException {
        List<String> csvList = new ArrayList<>();
        File getCSVFiles = new File("D:\\Teresa\\Diplomarbeit\\Elektroauto-Lademanager\\flexlogger_quarkus_angular\\flexlogger\\src\\test\\data2.csv");
        Scanner sc = new Scanner(getCSVFiles);
        sc.useDelimiter(",");
        while (sc.hasNext()) {
            csvList.add(String.valueOf(sc.hasNext()));
        }
        sc.close();
        return csvList;
    }
}
