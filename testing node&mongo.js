const{MongoClient}=require('mongodb');
async function main(){
    const
 url="mongodb+srv://salah:SD2511999@cluster0.r1yhq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
;

const client=new MongoClient(uri);
try
 
{

        
// Connect to the MongoDB cluster

        
await client connect();

 
        
// Make the appropriate DB calls

        
await listDatabases(client);

}
 
catch(e)
 
{
console.error(e);

}
 
finally
{
await client.close();
}

}
main().catch(console.error);


