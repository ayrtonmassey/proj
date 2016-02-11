(function() {
    var show_lesson = getParameterByName('lesson');
    var show_simulator = getParameterByName('simulator');

    var view = new MenuView({
        canvas: '#menu-canvas',
        view_canvas: '#view-canvas'
    });    

    view.init();

    if(show_simulator=='' || show_simulator==true) {
        view.show_round_robin_simulator();
    } else if (show_lesson) {
        var lesson_num = Number(show_lesson);
        if (typeof lesson_num == 'number' && (Math.floor(lesson_num) == lesson_num)) {
            try {
                view.show_lesson(lesson_num);
            } catch (ReferenceError) {
                // do nothing
            }
        }
    }
})();
