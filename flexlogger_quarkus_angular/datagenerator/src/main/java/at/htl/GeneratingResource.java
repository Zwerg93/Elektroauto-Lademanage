package at.htl;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("genData")
public class GeneratingResource {



    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response getData() {

        /*for (int i = 0; i < 100; i++) {
            System.out.println("This is so cooll " + i);
            try
            {
                Thread.sleep(1000);
            }
            catch(InterruptedException ex)
            {
                Thread.currentThread().interrupt();
            }
        }*/
        okayokay();

        return Response.ok().build();
    }


    public void okayokay(){
        for (int i = 0; i < 100; i++) {
            System.out.println("This is so cooll " + i);
            try
            {
                Thread.sleep(1000);
            }
            catch(InterruptedException ex)
            {
                Thread.currentThread().interrupt();
            }
        }
    }
}
