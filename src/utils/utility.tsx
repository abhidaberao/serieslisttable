function avg(array : any) {
    var total = 0;
    var count = 0;

    array.forEach(function(item : any, index : number) {
        total += item;
        count++;
    });

    return total / count;
}

export {avg}