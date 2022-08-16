package at.htl.trash;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class ReadCSV {

    public static void main(String[] args) throws FileNotFoundException {
        File getCSVFiles = new File("D:\\Teresa\\Diplomarbeit\\Elektroauto-Lademanager\\flexlogger_quarkus_angular\\flexlogger\\src\\test\\data2.csv");
        Scanner sc = new Scanner(getCSVFiles);
        sc.useDelimiter(",");
        while (sc.hasNext())
        {
            System.out.print(sc.next() + " | ");
        }
        sc.close();
    }
}
