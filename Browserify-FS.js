const fs=require("browserify-fs");
            fs.writeFile("./TestFile.txt","Hello World!", function(err){
                  if(err){
                        window.alert(err);
                  }
                  else{
                        window.alert("File created!");
                  }
            });
      