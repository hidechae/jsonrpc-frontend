function prettyPrint(obj, baseIndent) {

    var buff = [];
    var addIndent = function(buff, indent) {
        for (i=0; i<indent; i++) {
            buff.push(' ');
        }
    }
    var read = function(o, indent) {
        if (typeof(o) == "string" || o instanceof String) {
            return '"' + o + '"';
        } else if (typeof(o) == "number" || o instanceof Number) {

            return o;
        } else if (o instanceof Array) {
            if (o) {
                buff.push('[');
                for (idx in o) {
                    buff.push(read(o[idx], indent + baseIndent));
                    buff.push(', ');
                }
                if (o.length > 0)
                    delete buff[buff.length - 1];
                buff.push(']');
            }
        } else if (o instanceof Object) {
            if (o) {
                buff.push('{\n');
                for (key in o) {
                    addIndent(buff, indent + baseIndent);
                    buff.push('"' + key + '": ');
                    buff.push(read(o[key], indent + baseIndent));
                    buff.push(',\n');
                }
                delete buff[buff.length - 1];
                buff.push('\n');
                addIndent(buff, indent);
                buff.push('}');
            }
        }
    }
    read(obj, 0);
    return buff.join('');
}
