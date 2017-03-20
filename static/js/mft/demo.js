
//ALL VARIABLES
var blockHeight = [], occupiedB = [];//0 is unoccupied and 1 is occupied
var pixel;
var inputPixel, inputPNo = 1, totalProcesses = 0;
var inputQ = [];

var process = [{
    'id' : inputPNo,
    'size' : 200,
}];

$(document).ready(function(){
   //$('#page-heading').delay(1000).slideDown('slow');
   //$('#selection-form').delay(1000).fadeIn('slow');

   $('#right-box').css('width',$('#left-box').css('width')- 1 );

   inputPixel = parseInt($('#input-q-box').css('height'))/1000;
   var type = 0;

   $('#worst-fit-select').removeAttr('disabled');
   $('#best-fit-select').removeAttr('disabled');
   $('#first-fit-select').removeAttr('disabled');


   $('#first-fit-select').click(function () {
       $('#best-fit-select').attr('disabled','');
       $('#worst-fit-select').attr('disabled','');
       type = 1;
   });

   $('#best-fit-select').click(function(){
       $('#first-fit-select').attr('disabled','');
       $('#worst-fit-select').attr('disabled','');
       type = 2;
   });

   $('#worst-fit-select').click(function () {
       $('#best-fit-select').attr('disabled','');
       $('#first-fit-select').attr('disabled','');
       type = 3;
   });

   $('#add-process-button').click(function(){
       var size = prompt('Enter Process Size: ');
       if(size != '')
        addNewProcess(parseInt(size));
   });

   drawBlocks();
   calculateBlockHeight();


   //ALL Functions


   function calculateBlockHeight(){
       var height = parseInt($('#memory-box').css('height'));
       var totalBlockSize = 0;
       for(var i = 1;i<=noOfBlocks;i++)
           totalBlockSize += blockSize[i];
       pixel = height/totalMemory;
       $('#memory-box').css('height',height);
       for(var i = 1;i<=noOfBlocks;i++){
           blockHeight[i] = blockSize[i]*pixel;
       }
       for(var i = 1;i<=noOfBlocks;i++){
           $('#block-' + i).css('height',blockHeight[i]);
           occupiedB[i] = 0;
       }
   }

   function drawBlocks(){
       for(var i = 1;i<=noOfBlocks;i++){
           $('#memory-box').append('<div class="memory-block" id="block-'+ i + '">' +
               '<div class="child-box"></div>' +
               '<div class="block-background"></div> ' +
               '</div>');
       }
   }

   function slideBlock(blockId,height) {
       $('#block-' + blockId + ' > .child-box').css('height', height);
       if(height != 0)
           $('#block-'+blockId+' > .block-background').css('height',blockHeight[blockId]-height-2);
       changeBg(blockId);
   }

   function changeBg(blockId){
       if(!$('#block-'+blockId+' > .block-background').is(':visible'))
            $('#block-'+blockId+' > .block-background').delay(1000).fadeIn();
       else $('#block-'+blockId+' > .block-background').fadeOut();
   }

   function firstFit(process){
       for(var i = 0;i<=noOfBlocks;i++){
           if(occupiedB[i] == 0 && blockSize[i] >= process.size){
               return i;
           }
       }
       return -1;
   }
    
   function bestFit() {
        
   }

   function worstFit() {

   }

   function addToQueue(process){
       var inputH = inputPixel*process.size;
       console.log(inputH);
       $('#input-q-box').append('<a href="#" role="button"><div class="input-block" value="'+ process.id +'" id="input-p-'+ process.id + '">' +
           '</div></a>');
       $('#input-p-'+process.id).css('display','none');
       $('#input-p-'+process.id).css('height',inputH).fadeIn('slow')
           .on('click',function () {
               var id = $(this).attr('value');
               removeFromQueue(id);
           });
   }

   //addToQueue(process[0]);

   function removeFromQueue(id) {
       $('#input-p-'+id).fadeOut('slow');
       totalProcesses--;
   }


   function addNewProcess(size){
       var p = {};
       p.id = inputPNo;
       p.size = size;

       if(allocateBlock(p,type) == false){
           process.push(p);
           addToQueue(p);
           inputPNo++;
           totalProcesses++;
       }
   }

   function allocateBlock(process, type){
       var allocateTo = -1;
       switch(type){
           case 1:
               allocateTo = firstFit(process);
               break;
           case 2:
               break;
           case 3:
               break;
       }

       if(allocateTo == -1)
           return false;

       occupiedB[allocateTo] = 1;
       var height = pixel*process.size;
       slideBlock(allocateTo,height);

       return true;
   }

});