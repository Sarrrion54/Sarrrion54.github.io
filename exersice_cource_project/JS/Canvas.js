 var resizeableImage = function(image_target) {
    var $container,
        orig_src = new Image(),
        image_target = $(image_target).get(0),
        event_state = {},
        constrain = false,
        min_width = 60, 
        min_height = 60,
        max_width = 1200, 
        max_height = 1700,
        resize_canvas = document.createElement('canvas');
  
    init = function(){
  
      orig_src.src=image_target.src;
  
      $(image_target).wrap('<div class="resize-container"></div>')
      .before('<span class="resize-handle resize-handle-nw"></span>')
      .before('<span class="resize-handle resize-handle-ne"></span>')
      .after('<span class="resize-handle resize-handle-se"></span>')
      .after('<span class="resize-handle resize-handle-sw"></span>');
  
      $container =  $(image_target).parent('.resize-container');
  
      $container.on('mousedown touchstart', '.resize-handle', startResize);
    };
  
    startResize = function(e){
      e.preventDefault();
      e.stopPropagation();
      saveEventState(e);
      $(document).on('mousemove touchmove', resizing);
      $(document).on('mouseup touchend', endResize);
    };
  
    endResize = function(e){
      e.preventDefault();
      $(document).off('mouseup touchend', endResize);
      $(document).off('mousemove touchmove', resizing);
    };
  
    saveEventState = function(e){
      event_state.container_width = $container.width();
      event_state.container_height = $container.height();
      event_state.container_left = $container.offset().left; 
      event_state.container_top = $container.offset().top;
      event_state.mouse_x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + $(window).scrollLeft(); 
      event_state.mouse_y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + $(window).scrollTop();
      
      if(typeof e.originalEvent.touches !== 'undefined'){
          event_state.touches = [];
          $.each(e.originalEvent.touches, function(i, ob){
            event_state.touches[i] = {};
            event_state.touches[i].clientX = 0+ob.clientX;
            event_state.touches[i].clientY = 0+ob.clientY;
          });
      }
      event_state.evnt = e;
    };
  
    resizing = function(e){
      var mouse={},width,height,left,top,offset=$container.offset();
      mouse.x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + $(window).scrollLeft(); 
      mouse.y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + $(window).scrollTop();
      
      if( $(event_state.evnt.target).hasClass('resize-handle-se') ){
        width = mouse.x - event_state.container_left;
        height = mouse.y  - event_state.container_top;
        left = event_state.container_left;
        top = event_state.container_top;
      } else if($(event_state.evnt.target).hasClass('resize-handle-sw') ){
        width = event_state.container_width - (mouse.x - event_state.container_left);
        height = mouse.y  - event_state.container_top;
        left = mouse.x;
        top = event_state.container_top;
      } else if($(event_state.evnt.target).hasClass('resize-handle-nw') ){
        width = event_state.container_width - (mouse.x - event_state.container_left);
        height = event_state.container_height - (mouse.y - event_state.container_top);
        left = mouse.x;
        top = mouse.y;
        if(constrain || e.shiftKey){
          top = mouse.y - ((width / orig_src.width * orig_src.height) - height);
        }
      } else if($(event_state.evnt.target).hasClass('resize-handle-ne') ){
        width = mouse.x - event_state.container_left;
        height = event_state.container_height - (mouse.y - event_state.container_top);
        left = event_state.container_left;
        top = mouse.y;
        if(constrain || e.shiftKey){
          top = mouse.y - ((width / orig_src.width * orig_src.height) - height);
        }
      }
      
      if(constrain || e.shiftKey){
        height = width / orig_src.width * orig_src.height;
      }
  
      if(width > min_width && height > min_height && width < max_width && height < max_height){
        resizeImage(width, height);  
        $container.offset({'left': left, 'top': top});
      }
    }
  
    resizeImage = function(width, height){
      resize_canvas.width = width;
      resize_canvas.height = height;
      resize_canvas.getContext('2d').drawImage(orig_src, 0, 0, width, height);   
      $(image_target).attr('src', resize_canvas.toDataURL("image/png"));  
    };
  
    init();
  };
  
  resizeableImage($('.resize-image'));
  