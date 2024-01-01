function skillsMember() {
    var member = document.getElementById("member");
    var memberText = member.options[member.selectedIndex].text;
    var memberValue = member.options[member.selectedIndex].value;
    if (memberValue == 0) {
        document.getElementById("memberText").innerHTML = "Please select a member";
    } else {
        document.getElementById("memberText").innerHTML = "You selected: " + memberText;
    }
}