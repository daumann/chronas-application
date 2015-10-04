iD.ui.preset.textarea = function(field) {

    var event = d3.dispatch('change'),
        input;

    function i(selection) {
        input = selection.selectAll('textarea')
            .data([0]);

        input.enter().append('textarea')
            .attr('id', 'preset-input-' + field.id)
            .attr('placeholder', field.placeholder() || t('inspector.unknown'))
            .attr('maxlength', 255);

        input
            .on('blur', change)
            .on('change', change);
    }

    function change() {
        var t = {};
        t[field.key] = input.value() || undefined;
        event.change(t);
    }

    i.tags = function(tags) {
        input.value(tags[field.key] || '');
    };

    i.focus = function() {
        input.node().focus();
    };

    return d3.rebind(i, event, 'on');
};
