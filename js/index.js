(function (DOM) {
  "use strict";

  var app = (function () {
    var $form = new DOM("form");
    var $image = new DOM('input[name="photo"]');
    var $brand = new DOM('input[name="marca"]');
    var $model = new DOM('input[name="modelo"]');
    var $year = new DOM('input[name="ano"]');
    var $plate = new DOM('input[name="placa"]');
    var $color = new DOM('input[name="cor"]');

    return {
      init: function () {
        app.initEvents();
        app.companyInfo();
      },

      initEvents: function () {
        $form.on("submit", this.handleSubmit);
      },

      handleSubmit: function (e) {
        e.preventDefault();
        app.createNewCar();
      },

      createNewCar: function () {
        document.body.appendChild(app.createTable());
      },

      createTable: function () {
        var [table, tbody] = app.createTableStructure();

        table.appendChild(app.createTableBody(tbody));

        return table;
      },

      createTableStructure: function () {
        var $table;
        var $thead;
        var $tbody;

        if (!app.hasTable()) {
          $table = document.createElement("table");
          $thead = document.createElement("thead");
          $tbody = document.createElement("tbody");

          $table.appendChild(app.createTableHead($thead));

          $table.setAttribute("id", "table");
          $thead.setAttribute("id", "thead");
          $tbody.setAttribute("id", "tbody");
        } else {
          $table = document.getElementById("table");
          $thead = document.getElementById("thead");
          $tbody = document.getElementById("tbody");
        }

        return [$table, $tbody];
      },

      hasTable: function () {
        var table = document.getElementById("table");
        return document.body.contains(table);
      },

      createTableHead: function ($thead) {
        var $tr = document.createElement("tr");
        var $thImage = document.createElement("th");
        var $thBrand = document.createElement("th");
        var $thModel = document.createElement("th");
        var $thYear = document.createElement("th");
        var $thPlate = document.createElement("th");
        var $thColor = document.createElement("th");
        var $thAction = document.createElement("th");

        $thImage.textContent = "Image";
        $thBrand.textContent = "Brand";
        $thModel.textContent = "Model";
        $thYear.textContent = "Year";
        $thPlate.textContent = "Plate";
        $thColor.textContent = "Color";
        $thAction.textContent = "Action";

        $tr.appendChild($thImage);
        $tr.appendChild($thBrand);
        $tr.appendChild($thModel);
        $tr.appendChild($thYear);
        $tr.appendChild($thPlate);
        $tr.appendChild($thColor);
        $tr.appendChild($thAction);

        $thead.appendChild($tr);

        return $thead;
      },

      createTableBody: function ($tbody) {
        var $tr = document.createElement("tr");
        var $tdImage = document.createElement("td");
        var $tdBrand = document.createElement("td");
        var $tdModel = document.createElement("td");
        var $tdYear = document.createElement("td");
        var $tdPlate = document.createElement("td");
        var $tdColor = document.createElement("td");
        var $remover = document.createElement("input");

        $remover.setAttribute("type", "button");

        $tdImage.textContent = $image.get()[0].value;
        $tdBrand.textContent = $brand.get()[0].value;
        $tdModel.textContent = $model.get()[0].value;
        $tdYear.textContent = $year.get()[0].value;
        $tdPlate.textContent = $plate.get()[0].value;
        $tdColor.textContent = $color.get()[0].value;
        $remover.value = "Remover";

        app.removeItem($remover, $tr);

        $tr.appendChild($tdImage);
        $tr.appendChild($tdBrand);
        $tr.appendChild($tdModel);
        $tr.appendChild($tdYear);
        $tr.appendChild($tdPlate);
        $tr.appendChild($tdColor);
        $tr.appendChild($remover);

        $tbody.appendChild($tr);

        return $tbody;
      },

      removeItem: function (button, item) {
        button.addEventListener("click", function (e) {
          e.preventDefault();

          var tbody = document.querySelector("tbody");
          tbody.removeChild(item);
        });
      },

      insertNewCar: function (image, brand, model, year, plate, color) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3100/car");
        xhr.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        xhr.send(
          `image=${image}$brand=${brand}&model=${model}&year=${year}&plate=${plate}&color=${color}`
        );
      },

      companyInfo: function () {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "data/company.json");
        xhr.send();

        xhr.addEventListener("readystatechange", this.getCompanyInfo);
      },

      getCompanyInfo: function () {
        if (this.status === 200 && this.readyState === 4) {
          var { name, phone } = JSON.parse(this.responseText);

          app.setCompanyInfo(name, phone);
        }
      },

      setCompanyInfo: function (name, phone) {
        var $header = document.createElement("header");
        var $name = document.createElement("h1");
        var $phone = document.createElement("p");

        $name.textContent = name;
        $phone.textContent = phone;

        $header.appendChild($name);
        $header.appendChild($phone);

        document.body.insertBefore($header, $form.get()[0]);
      },
    };
  })();

  app.init();
})(window.DOM);
