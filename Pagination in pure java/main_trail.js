ten.addEventListener('click', function () {
    function getUrl(start = 0) {
        return 'https://api.instantwebtools.net/v1/passenger?page=1' + start + '&size=10';
    }
    function getData(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => loadDataIntoTable(data))
            .catch(err => console.log(err));

    }

    function loadDataIntoTable(data) {
        let userId = [];
        let userName = [];
        let userCountry = [];
        let userSlogan = [];
        let user24Change = [];

        data['data'].forEach((user) => {
            userId.push(user._id);
            userName.push(user.name);
            userCountry.push(user.airline[0].country);
            userSlogan.push(user.airline[0].slogan);
            console.log(user._id + ' || ' + user.name + ' || ' + user.airline[0].country + ' || ' + user.airline[0].slogan);
        });

        let tableBody = document.getElementById('myTable_boby');

        let html = "";

        for (let i = 0; i < userId.length; i++) {
            html += "<tr>";
            html += "<td class='name_table'>" + userName[i] + "</td>";
            html += "<td>" + userId[i] + "</td>";

            html += "<td class='country'>" + userCountry[i] + "</td>";
            html += "<td>" + userSlogan[i] + "</td>";


            html += "</tr>";
        }

        tableBody.innerHTML = html;
    }

    function handleNumberClick(clickedLink, leftArrow, rightArrow) {
        clickedLink.parentElement.classList = "active";
        let clickedLinkPageNumber = parseInt(clickedLink.innerText);
        const url = getUrl((clickedLinkPageNumber * 10) - 10);
        getData(url);

        switch (clickedLinkPageNumber) {
            case 1:
                disableLeftArrow(leftArrow);
                if (rightArrow.className.indexOf('disabled') !== -1) {
                    enableRightArrow(rightArrow);
                }
                break;
            case 10:
                disableRightArrow(rightArrow);
                if (leftArrow.className.indexOf('disabled') !== -1) {
                    enableLeftArrow(leftArrow);
                }
                break;
            default:
                if (leftArrow.className.indexOf('disabled') !== -1) {
                    enableLeftArrow(leftArrow);
                }
                if (rightArrow.className.indexOf('disabled') !== -1) {
                    enableRightArrow(rightArrow);
                }
                break;
        }
    }

    function handleLeftArrowClick(activePageNumber, leftArrow, rightArrow) {

        let previousPage = document.querySelectorAll('li')[activePageNumber - 1];
        previousPage.classList = "active";
        url = getUrl(((activePageNumber - 1) * 10) - 10);
        getData(url);

        if (activePageNumber === 10) {
            enableRightArrow(rightArrow);
        }

        if (activePageNumber - 1 === 1) {
            disableLeftArrow(leftArrow);
        }
    }

    function handleRightArrowClick(activePageNumber, leftArrow, rightArrow) {
        //move to next page
        let nextPage = document.querySelectorAll('li')[activePageNumber + 1];
        nextPage.classList = "active";

        url = getUrl(((activePageNumber + 1) * 10) - 10);
        getData(url);

        if (activePageNumber === 1) {
            enableLeftArrow(leftArrow);
        }

        if (activePageNumber + 1 === 10) {
            disableRightArrow(rightArrow);
        }
    }

    function disableLeftArrow(leftArrow) {
        leftArrow.classList = "disabled arrow-left";
    }

    function enableLeftArrow(leftArrow) {
        leftArrow.classList = "waves-effect arrow-left";
    }

    function disableRightArrow(rightArrow) {
        rightArrow.classList = "disabled arrow-right";
    }

    function enableRightArrow(rightArrow) {
        rightArrow.classList = "waves-effect arrow-right";
    }

    function init() {
        const url = getUrl();
        getData(url);
    }

    init();


    let pageLinks = document.querySelectorAll('a');
    let activePageNumber;
    let clickedLink;
    let leftArrow;
    let rightArrow;
    let url = '';

    pageLinks.forEach((element) => {
        element.addEventListener("click", function () {
            leftArrow = document.querySelector('.arrow-left');
            rightArrow = document.querySelector('.arrow-right');
            console.log(rightArrow);
            activeLink = document.querySelector('.active');


            activePageNumber = parseInt(activeLink.innerText);

            if ((this.innerText === 'chevron_left' && activePageNumber === 1) || (this.innerText === 'chevron_right' && activePageNumber === 10)) {
                return;
            }


            activeLink.classList = "waves-effect";

            if (this.innerText === 'chevron_left') {
                handleLeftArrowClick(activePageNumber, leftArrow, rightArrow);
            } else if (this.innerText === 'chevron_right') {
                handleRightArrowClick(activePageNumber, leftArrow, rightArrow);
            } else {
                handleNumberClick(this, leftArrow, rightArrow);
            }

        });
    });

    /////////////////////////////////////////////////////////////////////
    function mysort() {


        numbers.sort((a, b) => {
            if (a > b) return 1;
            if (a < b) return -1;
            return 0;
        });

    }


    function sortTable(n) {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("myTable");
        switching = true;
        dir = "asc";
        while (switching) {
            switching = false;
            rows = table.rows;//20
            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchcount++;
            } else {
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }

    function Numeric_table() {
        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("myTable");
        switching = true;

        while (switching) {

            switching = false;
            rows = table.rows;

            for (i = 1; i < (rows.length - 1); i++) {

                shouldSwitch = false;


                x = rows[i].getElementsByTagName("TD")[0];
                y = rows[i + 1].getElementsByTagName("TD")[0];

                if (Number(x.innerHTML) > Number(y.innerHTML)) {

                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {

                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
    }



    function myFunction() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByClassName("name_table")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";

                }
            }
        }
    }


    function mycountry() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("mycountry");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByClassName("country")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";

                }
            }
        }
    }

});
tweenty.addEventListener('click', function () {
    function getUrl(start = 0) {
        return 'https://api.instantwebtools.net/v1/passenger?page=1' + start + '&size=20';
    }
    function getData(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => loadDataIntoTable(data))
            .catch(err => console.log(err));

    }

    function loadDataIntoTable(data) {
        let userId = [];
        let userName = [];
        let userCountry = [];
        let userSlogan = [];
        let user24Change = [];

        data['data'].forEach((user) => {
            userId.push(user._id);
            userName.push(user.name);
            userCountry.push(user.airline[0].country);
            userSlogan.push(user.airline[0].slogan);

            console.log(user._id + ' || ' + user.name + ' || ' + user.airline[0].country + ' || ' + user.airline[0].slogan);

        });

        let tableBody = document.getElementById('myTable_boby');

        let html = "";

        for (let i = 0; i < userId.length; i++) {
            html += "<tr>";
            html += "<td class='name_table'>" + userName[i] + "</td>";
            html += "<td>" + userId[i] + "</td>";

            html += "<td class='country'>" + userCountry[i] + "</td>";
            html += "<td>" + userSlogan[i] + "</td>";


            html += "</tr>";
        }

        tableBody.innerHTML = html;
    }

    function handleNumberClick(clickedLink, leftArrow, rightArrow) {
        clickedLink.parentElement.classList = "active";
        let clickedLinkPageNumber = parseInt(clickedLink.innerText);
        const url = getUrl((clickedLinkPageNumber * 10) - 10);
        getData(url);

        switch (clickedLinkPageNumber) {
            case 1:
                disableLeftArrow(leftArrow);
                if (rightArrow.className.indexOf('disabled') !== -1) {
                    enableRightArrow(rightArrow);
                }
                break;
            case 10:
                disableRightArrow(rightArrow);
                if (leftArrow.className.indexOf('disabled') !== -1) {
                    enableLeftArrow(leftArrow);
                }
                break;
            default:
                if (leftArrow.className.indexOf('disabled') !== -1) {
                    enableLeftArrow(leftArrow);
                }
                if (rightArrow.className.indexOf('disabled') !== -1) {
                    enableRightArrow(rightArrow);
                }
                break;
        }
    }

    function handleLeftArrowClick(activePageNumber, leftArrow, rightArrow) {

        let previousPage = document.querySelectorAll('li')[activePageNumber - 1];
        previousPage.classList = "active";
        url = getUrl(((activePageNumber - 1) * 10) - 10);
        getData(url);

        if (activePageNumber === 10) {
            enableRightArrow(rightArrow);
        }

        if (activePageNumber - 1 === 1) {
            disableLeftArrow(leftArrow);
        }
    }

    function handleRightArrowClick(activePageNumber, leftArrow, rightArrow) {
        //move to next page
        let nextPage = document.querySelectorAll('li')[activePageNumber + 1];
        nextPage.classList = "active";

        url = getUrl(((activePageNumber + 1) * 10) - 10);
        getData(url);

        if (activePageNumber === 1) {
            enableLeftArrow(leftArrow);
        }

        if (activePageNumber + 1 === 10) {
            disableRightArrow(rightArrow);
        }
    }

    function disableLeftArrow(leftArrow) {
        leftArrow.classList = "disabled arrow-left";
    }

    function enableLeftArrow(leftArrow) {
        leftArrow.classList = "waves-effect arrow-left";
    }

    function disableRightArrow(rightArrow) {
        rightArrow.classList = "disabled arrow-right";
    }

    function enableRightArrow(rightArrow) {
        rightArrow.classList = "waves-effect arrow-right";
    }

    function init() {
        const url = getUrl();
        getData(url);
    }

    init();


    let pageLinks = document.querySelectorAll('a');
    let activePageNumber;
    let clickedLink;
    let leftArrow;
    let rightArrow;
    let url = '';

    pageLinks.forEach((element) => {
        element.addEventListener("click", function () {
            leftArrow = document.querySelector('.arrow-left');
            rightArrow = document.querySelector('.arrow-right');
            console.log(rightArrow);
            activeLink = document.querySelector('.active');


            activePageNumber = parseInt(activeLink.innerText);

            if ((this.innerText === 'chevron_left' && activePageNumber === 1) || (this.innerText === 'chevron_right' && activePageNumber === 10)) {
                return;
            }


            activeLink.classList = "waves-effect";

            if (this.innerText === 'chevron_left') {
                handleLeftArrowClick(activePageNumber, leftArrow, rightArrow);
            } else if (this.innerText === 'chevron_right') {
                handleRightArrowClick(activePageNumber, leftArrow, rightArrow);
            } else {
                handleNumberClick(this, leftArrow, rightArrow);
            }

        });
    });

    /////////////////////////////////////////////////////////////////////
    function mysort() {


        numbers.sort((a, b) => {
            if (a > b) return 1;
            if (a < b) return -1;
            return 0;
        });

    }


    function sortTable(n) {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("myTable");
        switching = true;
        dir = "asc";
        while (switching) {
            switching = false;
            rows = table.rows;//20
            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchcount++;
            } else {
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }

    function Numeric_table() {
        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("myTable");
        switching = true;

        while (switching) {

            switching = false;
            rows = table.rows;

            for (i = 1; i < (rows.length - 1); i++) {

                shouldSwitch = false;


                x = rows[i].getElementsByTagName("TD")[0];
                y = rows[i + 1].getElementsByTagName("TD")[0];

                if (Number(x.innerHTML) > Number(y.innerHTML)) {

                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {

                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
    }



    function myFunction() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByClassName("name_table")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";

                }
            }
        }
    }


    function mycountry() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("mycountry");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByClassName("country")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";

                }
            }
        }
    }

});
thirty.addEventListener('click', function () {
    function getUrl(start = 0) {
        return 'https://api.instantwebtools.net/v1/passenger?page=1' + start + '&size=30';
    }
    function getData(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => loadDataIntoTable(data))
            .catch(err => console.log(err));

    }

    function loadDataIntoTable(data) {
        let userId = [];
        let userName = [];
        let userCountry = [];
        let userSlogan = [];
        let user24Change = [];

        data['data'].forEach((user) => {
            userId.push(user._id);
            userName.push(user.name);
            userCountry.push(user.airline[0].country);
            userSlogan.push(user.airline[0].slogan);

            console.log(user._id + ' || ' + user.name + ' || ' + user.airline[0].country + ' || ' + user.airline[0].slogan);

        });

        let tableBody = document.getElementById('myTable_boby');

        let html = "";

        for (let i = 0; i < userId.length; i++) {
            html += "<tr>";
            html += "<td class='name_table'>" + userName[i] + "</td>";
            html += "<td>" + userId[i] + "</td>";

            html += "<td class='country'>" + userCountry[i] + "</td>";
            html += "<td>" + userSlogan[i] + "</td>";


            html += "</tr>";
        }

        tableBody.innerHTML = html;
    }

    function handleNumberClick(clickedLink, leftArrow, rightArrow) {
        clickedLink.parentElement.classList = "active";
        let clickedLinkPageNumber = parseInt(clickedLink.innerText);
        const url = getUrl((clickedLinkPageNumber * 10) - 10);
        getData(url);

        switch (clickedLinkPageNumber) {
            case 1:
                disableLeftArrow(leftArrow);
                if (rightArrow.className.indexOf('disabled') !== -1) {
                    enableRightArrow(rightArrow);
                }
                break;
            case 10:
                disableRightArrow(rightArrow);
                if (leftArrow.className.indexOf('disabled') !== -1) {
                    enableLeftArrow(leftArrow);
                }
                break;
            default:
                if (leftArrow.className.indexOf('disabled') !== -1) {
                    enableLeftArrow(leftArrow);
                }
                if (rightArrow.className.indexOf('disabled') !== -1) {
                    enableRightArrow(rightArrow);
                }
                break;
        }
    }

    function handleLeftArrowClick(activePageNumber, leftArrow, rightArrow) {

        let previousPage = document.querySelectorAll('li')[activePageNumber - 1];
        previousPage.classList = "active";
        url = getUrl(((activePageNumber - 1) * 10) - 10);
        getData(url);

        if (activePageNumber === 10) {
            enableRightArrow(rightArrow);
        }

        if (activePageNumber - 1 === 1) {
            disableLeftArrow(leftArrow);
        }
    }

    function handleRightArrowClick(activePageNumber, leftArrow, rightArrow) {
        //move to next page
        let nextPage = document.querySelectorAll('li')[activePageNumber + 1];
        nextPage.classList = "active";

        url = getUrl(((activePageNumber + 1) * 10) - 10);
        getData(url);

        if (activePageNumber === 1) {
            enableLeftArrow(leftArrow);
        }

        if (activePageNumber + 1 === 10) {
            disableRightArrow(rightArrow);
        }
    }

    function disableLeftArrow(leftArrow) {
        leftArrow.classList = "disabled arrow-left";
    }

    function enableLeftArrow(leftArrow) {
        leftArrow.classList = "waves-effect arrow-left";
    }

    function disableRightArrow(rightArrow) {
        rightArrow.classList = "disabled arrow-right";
    }

    function enableRightArrow(rightArrow) {
        rightArrow.classList = "waves-effect arrow-right";
    }

    function init() {
        const url = getUrl();
        getData(url);
    }

    init();


    let pageLinks = document.querySelectorAll('a');
    let activePageNumber;
    let clickedLink;
    let leftArrow;
    let rightArrow;
    let url = '';

    pageLinks.forEach((element) => {
        element.addEventListener("click", function () {
            leftArrow = document.querySelector('.arrow-left');
            rightArrow = document.querySelector('.arrow-right');
            console.log(rightArrow);
            activeLink = document.querySelector('.active');


            activePageNumber = parseInt(activeLink.innerText);

            if ((this.innerText === 'chevron_left' && activePageNumber === 1) || (this.innerText === 'chevron_right' && activePageNumber === 10)) {
                return;
            }


            activeLink.classList = "waves-effect";

            if (this.innerText === 'chevron_left') {
                handleLeftArrowClick(activePageNumber, leftArrow, rightArrow);
            } else if (this.innerText === 'chevron_right') {
                handleRightArrowClick(activePageNumber, leftArrow, rightArrow);
            } else {
                handleNumberClick(this, leftArrow, rightArrow);
            }

        });
    });

    /////////////////////////////////////////////////////////////////////
    function mysort() {


        numbers.sort((a, b) => {
            if (a > b) return 1;
            if (a < b) return -1;
            return 0;
        });

    }


    function sortTable(n) {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("myTable");
        switching = true;
        dir = "asc";
        while (switching) {
            switching = false;
            rows = table.rows;//20
            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchcount++;
            } else {
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }

    function Numeric_table() {
        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("myTable");
        switching = true;

        while (switching) {

            switching = false;
            rows = table.rows;

            for (i = 1; i < (rows.length - 1); i++) {

                shouldSwitch = false;


                x = rows[i].getElementsByTagName("TD")[0];
                y = rows[i + 1].getElementsByTagName("TD")[0];

                if (Number(x.innerHTML) > Number(y.innerHTML)) {

                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {

                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
    }



    function myFunction() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByClassName("name_table")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";

                }
            }
        }
    }


    function mycountry() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("mycountry");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByClassName("country")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";

                }
            }
        }
    }


});
fourty.addEventListener('click', function () {
    function getUrl(start = 0) {
        return 'https://api.instantwebtools.net/v1/passenger?page=1' + start + '&size=40';
    }
    function getData(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => loadDataIntoTable(data))
            .catch(err => console.log(err));

    }

    function loadDataIntoTable(data) {
        let userId = [];
        let userName = [];
        let userCountry = [];
        let userSlogan = [];
        let user24Change = [];

        data['data'].forEach((user) => {
            userId.push(user._id);
            userName.push(user.name);
            userCountry.push(user.airline[0].country);
            userSlogan.push(user.airline[0].slogan);

            console.log(user._id + ' || ' + user.name + ' || ' + user.airline[0].country + ' || ' + user.airline[0].slogan);

        });

        let tableBody = document.getElementById('myTable_boby');

        let html = "";

        for (let i = 0; i < userId.length; i++) {
            html += "<tr>";
            html += "<td class='name_table'>" + userName[i] + "</td>";
            html += "<td>" + userId[i] + "</td>";

            html += "<td class='country'>" + userCountry[i] + "</td>";
            html += "<td>" + userSlogan[i] + "</td>";


            html += "</tr>";
        }

        tableBody.innerHTML = html;
    }

    function handleNumberClick(clickedLink, leftArrow, rightArrow) {
        clickedLink.parentElement.classList = "active";
        let clickedLinkPageNumber = parseInt(clickedLink.innerText);
        const url = getUrl((clickedLinkPageNumber * 10) - 10);
        getData(url);

        switch (clickedLinkPageNumber) {
            case 1:
                disableLeftArrow(leftArrow);
                if (rightArrow.className.indexOf('disabled') !== -1) {
                    enableRightArrow(rightArrow);
                }
                break;
            case 10:
                disableRightArrow(rightArrow);
                if (leftArrow.className.indexOf('disabled') !== -1) {
                    enableLeftArrow(leftArrow);
                }
                break;
            default:
                if (leftArrow.className.indexOf('disabled') !== -1) {
                    enableLeftArrow(leftArrow);
                }
                if (rightArrow.className.indexOf('disabled') !== -1) {
                    enableRightArrow(rightArrow);
                }
                break;
        }
    }

    function handleLeftArrowClick(activePageNumber, leftArrow, rightArrow) {

        let previousPage = document.querySelectorAll('li')[activePageNumber - 1];
        previousPage.classList = "active";
        url = getUrl(((activePageNumber - 1) * 10) - 10);
        getData(url);

        if (activePageNumber === 10) {
            enableRightArrow(rightArrow);
        }

        if (activePageNumber - 1 === 1) {
            disableLeftArrow(leftArrow);
        }
    }

    function handleRightArrowClick(activePageNumber, leftArrow, rightArrow) {
        //move to next page
        let nextPage = document.querySelectorAll('li')[activePageNumber + 1];
        nextPage.classList = "active";

        url = getUrl(((activePageNumber + 1) * 10) - 10);
        getData(url);

        if (activePageNumber === 1) {
            enableLeftArrow(leftArrow);
        }

        if (activePageNumber + 1 === 10) {
            disableRightArrow(rightArrow);
        }
    }

    function disableLeftArrow(leftArrow) {
        leftArrow.classList = "disabled arrow-left";
    }

    function enableLeftArrow(leftArrow) {
        leftArrow.classList = "waves-effect arrow-left";
    }

    function disableRightArrow(rightArrow) {
        rightArrow.classList = "disabled arrow-right";
    }

    function enableRightArrow(rightArrow) {
        rightArrow.classList = "waves-effect arrow-right";
    }

    function init() {
        const url = getUrl();
        getData(url);
    }

    init();


    let pageLinks = document.querySelectorAll('a');
    let activePageNumber;
    let clickedLink;
    let leftArrow;
    let rightArrow;
    let url = '';

    pageLinks.forEach((element) => {
        element.addEventListener("click", function () {
            leftArrow = document.querySelector('.arrow-left');
            rightArrow = document.querySelector('.arrow-right');
            console.log(rightArrow);
            activeLink = document.querySelector('.active');


            activePageNumber = parseInt(activeLink.innerText);

            if ((this.innerText === 'chevron_left' && activePageNumber === 1) || (this.innerText === 'chevron_right' && activePageNumber === 10)) {
                return;
            }


            activeLink.classList = "waves-effect";

            if (this.innerText === 'chevron_left') {
                handleLeftArrowClick(activePageNumber, leftArrow, rightArrow);
            } else if (this.innerText === 'chevron_right') {
                handleRightArrowClick(activePageNumber, leftArrow, rightArrow);
            } else {
                handleNumberClick(this, leftArrow, rightArrow);
            }

        });
    });

    /////////////////////////////////////////////////////////////////////
    function mysort() {


        numbers.sort((a, b) => {
            if (a > b) return 1;
            if (a < b) return -1;
            return 0;
        });

    }


    function sortTable(n) {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("myTable");
        switching = true;
        dir = "asc";
        while (switching) {
            switching = false;
            rows = table.rows;//20
            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchcount++;
            } else {
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }

    function Numeric_table() {
        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("myTable");
        switching = true;

        while (switching) {

            switching = false;
            rows = table.rows;

            for (i = 1; i < (rows.length - 1); i++) {

                shouldSwitch = false;


                x = rows[i].getElementsByTagName("TD")[0];
                y = rows[i + 1].getElementsByTagName("TD")[0];

                if (Number(x.innerHTML) > Number(y.innerHTML)) {

                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {

                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
    }



    function myFunction() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByClassName("name_table")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";

                }
            }
        }
    }


    function mycountry() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("mycountry");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByClassName("country")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";

                }
            }
        }
    }

});
fifty.addEventListener('click', function () {
    function getUrl(start = 0) {
        return 'https://api.instantwebtools.net/v1/passenger?page=1' + start + '&size=50';
    }
    function getData(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => loadDataIntoTable(data))
            .catch(err => console.log(err));

    }

    function loadDataIntoTable(data) {
        let userId = [];
        let userName = [];
        let userCountry = [];
        let userSlogan = [];
        let user24Change = [];

        data['data'].forEach((user) => {
            userId.push(user._id);
            userName.push(user.name);
            userCountry.push(user.airline[0].country);
            userSlogan.push(user.airline[0].slogan);

            console.log(user._id + ' || ' + user.name + ' || ' + user.airline[0].country + ' || ' + user.airline[0].slogan);

        });

        let tableBody = document.getElementById('myTable_boby');

        let html = "";

        for (let i = 0; i < userId.length; i++) {
            html += "<tr>";
            html += "<td class='name_table'>" + userName[i] + "</td>";
            html += "<td>" + userId[i] + "</td>";

            html += "<td class='country'>" + userCountry[i] + "</td>";
            html += "<td>" + userSlogan[i] + "</td>";


            html += "</tr>";
        }

        tableBody.innerHTML = html;
    }

    function handleNumberClick(clickedLink, leftArrow, rightArrow) {
        clickedLink.parentElement.classList = "active";
        let clickedLinkPageNumber = parseInt(clickedLink.innerText);
        const url = getUrl((clickedLinkPageNumber * 10) - 10);
        getData(url);

        switch (clickedLinkPageNumber) {
            case 1:
                disableLeftArrow(leftArrow);
                if (rightArrow.className.indexOf('disabled') !== -1) {
                    enableRightArrow(rightArrow);
                }
                break;
            case 10:
                disableRightArrow(rightArrow);
                if (leftArrow.className.indexOf('disabled') !== -1) {
                    enableLeftArrow(leftArrow);
                }
                break;
            default:
                if (leftArrow.className.indexOf('disabled') !== -1) {
                    enableLeftArrow(leftArrow);
                }
                if (rightArrow.className.indexOf('disabled') !== -1) {
                    enableRightArrow(rightArrow);
                }
                break;
        }
    }

    function handleLeftArrowClick(activePageNumber, leftArrow, rightArrow) {

        let previousPage = document.querySelectorAll('li')[activePageNumber - 1];
        previousPage.classList = "active";
        url = getUrl(((activePageNumber - 1) * 10) - 10);
        getData(url);

        if (activePageNumber === 10) {
            enableRightArrow(rightArrow);
        }

        if (activePageNumber - 1 === 1) {
            disableLeftArrow(leftArrow);
        }
    }

    function handleRightArrowClick(activePageNumber, leftArrow, rightArrow) {
        //move to next page
        let nextPage = document.querySelectorAll('li')[activePageNumber + 1];
        nextPage.classList = "active";

        url = getUrl(((activePageNumber + 1) * 10) - 10);
        getData(url);

        if (activePageNumber === 1) {
            enableLeftArrow(leftArrow);
        }

        if (activePageNumber + 1 === 10) {
            disableRightArrow(rightArrow);
        }
    }

    function disableLeftArrow(leftArrow) {
        leftArrow.classList = "disabled arrow-left";
    }

    function enableLeftArrow(leftArrow) {
        leftArrow.classList = "waves-effect arrow-left";
    }

    function disableRightArrow(rightArrow) {
        rightArrow.classList = "disabled arrow-right";
    }

    function enableRightArrow(rightArrow) {
        rightArrow.classList = "waves-effect arrow-right";
    }

    function init() {
        const url = getUrl();
        getData(url);
    }

    init();


    let pageLinks = document.querySelectorAll('a');
    let activePageNumber;
    let clickedLink;
    let leftArrow;
    let rightArrow;
    let url = '';

    pageLinks.forEach((element) => {
        element.addEventListener("click", function () {
            leftArrow = document.querySelector('.arrow-left');
            rightArrow = document.querySelector('.arrow-right');
            console.log(rightArrow);
            activeLink = document.querySelector('.active');


            activePageNumber = parseInt(activeLink.innerText);

            if ((this.innerText === 'chevron_left' && activePageNumber === 1) || (this.innerText === 'chevron_right' && activePageNumber === 10)) {
                return;
            }


            activeLink.classList = "waves-effect";

            if (this.innerText === 'chevron_left') {
                handleLeftArrowClick(activePageNumber, leftArrow, rightArrow);
            } else if (this.innerText === 'chevron_right') {
                handleRightArrowClick(activePageNumber, leftArrow, rightArrow);
            } else {
                handleNumberClick(this, leftArrow, rightArrow);
            }

        });
    });

    /////////////////////////////////////////////////////////////////////
    function mysort() {


        numbers.sort((a, b) => {
            if (a > b) return 1;
            if (a < b) return -1;
            return 0;
        });

    }


    function sortTable(n) {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("myTable");
        switching = true;
        dir = "asc";
        while (switching) {
            switching = false;
            rows = table.rows;//20
            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchcount++;
            } else {
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }

    function Numeric_table() {
        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("myTable");
        switching = true;

        while (switching) {

            switching = false;
            rows = table.rows;

            for (i = 1; i < (rows.length - 1); i++) {

                shouldSwitch = false;


                x = rows[i].getElementsByTagName("TD")[0];
                y = rows[i + 1].getElementsByTagName("TD")[0];

                if (Number(x.innerHTML) > Number(y.innerHTML)) {

                    shouldSwitch = true;
                    break;
                }
            }
            if (shouldSwitch) {

                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
    }



    function myFunction() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByClassName("name_table")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";

                }
            }
        }
    }


    function mycountry() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("mycountry");
        filter = input.value.toUpperCase();
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByClassName("country")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";

                }
            }
        }
    }


});
