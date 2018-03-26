financialCalculator = {
    PV : function(rate, nper, pmt, fv) {
        /**
         * rate, nper, pmt is required to calculate pv
         * fv is optinoal
         * only calculate pv at the condition that pmt is made at end of the period
         */
        if (!(rate && nper && pmt)) {
            throw new Error('One or some parameter(s) missing!! ');
        }

        rate = parseFloat(rate);
        nper = parseFloat(nper);
        pmt = parseFloat(pmt);
        if(nper == 0) {
            alert('Make no sense to calculate PV with number of payment of zero!!');
            return 0;
        }
        if (fv) {
            fv = parseFloat(fv);
        }
        var pv_value = 0;

        if ( rate == 0 ) { // Interest rate is 0
            pv_value = -(fv + (pmt * nper));
        } else {
            x = Math.pow(1 + rate, -nper); 
            y = Math.pow(1 + rate, nper);
            pv_value = - ( x * ( fv * rate - pmt + y * pmt )) / rate;
        }
        pv_value = conv_number(pv_value,2);
        return (pv_value);
    },

    FV : function (rate, nper, pmt, pv) {
        if (!(rate && nper && pmt)) {
            throw new Error('One or some parameter(s) missing!! ');
        }
        rate = parseFloat(rate);
        nper = parseFloat(nper);
        pmt = parseFloat(pmt);
        pv = parseFloat(pv);
        if ( nper == 0 ) {
            alert("Make no sense to calculate FV with number of payment of zero!!");
            return(0);
        }
        var fv_value = 0;
        if ( rate == 0 ) { // Interest rate is 0
            fv_value = -(pv + (pmt * nper));
        } else {
            x = Math.pow(1 + rate, nper);
            fv_value = - ( -pmt + x * pmt + rate * x * pv ) /rate;
        }
        fv_value = conv_number(fv_value,2);
        return (fv_value);
    }
}

function conv_number(expr, decplaces) {
    var str = "" + Math.round(eval(expr) * Math.pow(10,decplaces));
    while (str.length <= decplaces) {
        str = "0" + str;
}

    var decpoint = str.length - decplaces;
    return (str.substring(0,decpoint) + "." + str.substring(decpoint,str.length));
}