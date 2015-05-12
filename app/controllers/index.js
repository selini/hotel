var dayA,
    monthA,
    yearA,
    dayD,
    monthD,
    yearD,
    rooms = 1,
    adults = 2,
    child1 = 0,
    child2 = 0,
    minDate,
    maxDate,
    dateValue,
    changeValue = true;

var square = require('ti.sq');
minDate = new Date();
dayA = minDate.getDate();
monthA = (minDate.getMonth() + 1);
yearA = minDate.getFullYear();

var calendarViewA = square.createView({
	height : 200,
	width : 200,
	pagingEnabled : true,
	min : {
		month : monthA,
		day : dayA,
		year : yearA
	},
	max : {
		month : 01,
		day : 01,
		year : 2035
	}
});

var calendarViewD = square.createView({
	height : 200,
	width : 200,
	pagingEnabled : true,
	max : {
		month : 01,
		day : 01,
		year : 2035
	}
});

calendarViewA.addEventListener('dateChanged', function(d) {
	setArrival(d.dateValue);
	changeValue = false;
	calendarViewD.value = {
		month : monthA,
		day : dayA,
		year : yearA
	};
	calendarViewA.setVisible(false);

});

calendarViewD.addEventListener('dateChanged', function(d) {
	if (changeValue) {
		setDeparture(d.dateValue);
	}
	changeValue = true;
	calendarViewD.setVisible(false);

});

$.index.add(calendarViewA);
$.index.add(calendarViewD);
calendarViewA.setVisible(false);
calendarViewD.setVisible(false);

function BookNow() {
	rooms = $.numberfRooms.value;
	adults = $.numberfAdults.value;

	if (dayA != null && monthA != null && yearA !== null && dayD != null && monthD != null && yearD !== null) {
		var win = Alloy.createController("checking", {
			rooms : rooms,
			adults : adults,
			dayA : dayA,
			monthA : monthA,
			yearA : yearA,
			dayD : dayD,
			monthD : monthD,
			yearD : yearD,
			child1 : child1,
			child2 : child2
		});
		$.index.close();
		win.getView().open();
	} else {
		alert("please fill the dates");
	}
}

function showPickerA(e) {
	calendarViewA.setVisible(true);
	calendarViewA.top = 120;

}

function showPickerD(e) {
	calendarViewD.setVisible(true);
	calendarViewD.top = 180;

}

function showPickerR(e) {
	$.Numberpicker.top = 220;
	$.Numberpicker.minDate = dateValue;
	$.Numberpicker.visible = "true";
	$.numberfAdults.visible = "false";
	$.Childrean17.visible = "false";
	$.Childrean712.visible = "false";
	$.book.visible = "false";

}

function showPickerAD(e) {
	$.Numberpicker.top = 270;
	$.Childrean17.visible = "false";
	$.Childrean712.visible = "false";
	$.Numberpicker.visible = "true";
}

function showPickerC1(e) {
	$.Numberpicker.top = 320;
	$.Childrean712.visible = "false";
	$.Numberpicker.visible = "true";
}

function showPickerC2(e) {
	$.Numberpicker.top = 370;
	$.Numberpicker.visible = "true";
}

function setArrival(e) {
	$.departure.value="";
	dayA = e.getDate();
	monthA = (e.getMonth() + 1);
	yearA = e.getFullYear();
	$.arrival.value = dayA + '/' + monthA + '/' + yearA;
}

function setDeparture(e) {
	dayD = e.getDate();
	monthD = (e.getMonth() + 1);
	yearD = e.getFullYear();
	if (monthA < monthD) {
			$.departure.value = dayD + '/' + monthD + '/' + yearD;
	} else if ( monthA = monthD) {
		if (dayA <= dayD)
			$.departure.value = dayD + '/' + monthD + '/' + yearD;
		else
			$.departure.value = "";
	} else {
		$.departure.value = "";

	}

}

function setNumber(e) {
	$.Numberpicker.visible = "false";
	var num = $.Numberpicker.getSelectedRow(0).title;
	$.numberfAdults.visible = "true";
	$.Childrean17.visible = "true";
	$.Childrean712.visible = "true";
	$.book.visible = "true";

	if ($.Numberpicker.top == 270) {
		$.numberfAdults.value = num;
	} else if ($.Numberpicker.top == 320) {
		$.Childrean17.value = num;
		child1 = num;
	} else if ($.Numberpicker.top == 370) {
		$.Childrean712.value = num;
		child2 = num;
	} else {
		$.numberfRooms.value = num;
	}
}

$.index.open();
