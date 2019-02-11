/* global $ */

//get all users from database by hitting url /users 
 $(function(){
   //get/read
   $("#getusers").on("click",function(){
       $.ajax({
           url:"/users",                   // /users hit the url in server and get raw data(users)
           contentType : "application/json",
           success:function(response){    //response contains all users from database 
            var tbodyel=$("tbody");
            tbodyel.html(" ");
          
           response.users.forEach(function(user){
            tbodyel.append('   <tr>\
                                 <td><input type="text" class="name" value="' + user.name + '"></td>\
                                  <td><input type="text" class="email" value="' + user.email + '"></td>\
                                   <td><input type="number" class="age" value="' + user.age + '"></td>\
                                   <td>\
                                        <button id='+user._id +'   class="update-button btn btn-warning btn-sm">UPDATE</button>\
                                        <button id='+user._id +'  class="delete-button btn btn-danger btn-sm">DELETE</button>\
                                   </td>\
                             </tr>\         ');
                  
           });
           
            }
       });
   });
     
 //add  user to the database by hitting post request on /users  and show on index.html
 $("#create-form").on("submit",function(){
  event.preventDefault();
  var formData = {
    		name : $("#name").val(),
    		email :  $("#email").val(),
    		age :  $("#age").val()
    		};
    		
    	function resetData(){
    	$("#name").val("");
    	$("#email").val("");
    	$("#age").val("");
    }
    		
  //button create user 
  $.ajax({
          url:"/users",
          method:"POST",
          contentType:"application/json",
          data:JSON.stringify({Data:formData}),
          success:function(response){
           
           
           resetData();
           $("#getusers").click();
          }
          
  });
 });
     
   //using ajax let user update the data ,save that data and send it to server by sending put request on /users/:id  
    // UPDATE/PUT
    $('table').on('click', '.update-button', function() {
        var rowEl = $(this).closest('tr');
        var name = rowEl.find('.name').val();
         var email = rowEl.find('.email').val();
        var age = rowEl.find('.age').val();

        $.ajax({
            url: '/users/' + $(this).attr('id'),
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ name: name, email:email,age:age }),
            success: function(response) {
               $('#getusers').click();
            }
        });
    });
    
    


 // delete user by hitting delete request on /users/:id 
    $('table').on('click', '.delete-button', function() {
          var rowEl = $(this).closest('tr');
        $.ajax({
            url: '/users/' + $(this).attr('id'),
            method: 'DELETE',
            contentType: 'application/json',
               success: function(response) {
                
                $('#getusers').click();
            }
        });
    });
 });
    
    