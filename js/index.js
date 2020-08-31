(function (DOM) {
  "use strict";

  var app = (function () {
    var $form = new DOM("form");
    var $tbody = new DOM('[data-js="tbody"]');
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
        app.getCars();
      },

      initEvents: function () {
        $form.on("submit", this.handleSubmit);
      },

      clearTableData: function () {
        if ($tbody.get()[0].hasChildNodes()) {
          $tbody.get()[0].innerHTML = "";
        }
      },

      handleSubmit: function (e) {
        e.preventDefault();
        app.insertNewCar();
        app.updateCars();
      },

      getCars: function () {
        app.clearTableData();

        var xhr = new XMLHttpRequest();

        xhr.open("GET", "http://localhost:3100/car");
        xhr.send();

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            var cars = JSON.parse(xhr.responseText);
            app.createCarData(cars);
          }
        };
      },

      updateCars: function () {
        var xhr = new XMLHttpRequest();

        xhr.open("PUT", "http://localhost:3100/car");
        xhr.send();

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            var car = JSON.parse(xhr.responseText);

            app.createCarData(car);
          }
        };
      },

      createCarData: function (cars) {
        cars.forEach(function (car) {
          var $tr = document.createElement("tr");
          var $image = document.createElement("td");
          var $brand = document.createElement("td");
          var $model = document.createElement("td");
          var $year = document.createElement("td");
          var $plate = document.createElement("td");
          var $color = document.createElement("td");
          var $action = document.createElement("td");

          var $button = app.createButtonRemove(car);

          $image.textContent = car.image;
          $brand.textContent = car.brand;
          $model.textContent = car.model;
          $year.textContent = car.year;
          $plate.textContent = car.plate;
          $color.textContent = car.color;

          $tr.appendChild($image);
          $tr.appendChild($brand);
          $tr.appendChild($model);
          $tr.appendChild($year);
          $tr.appendChild($plate);
          $tr.appendChild($color);
          $tr.appendChild($button);
          $tbody.get()[0].appendChild($tr);
        });
      },

      createButtonRemove: function (car) {
        var $button = document.createElement("input");
        $button.setAttribute("type", "button");
        $button.value = "Remove";

        $button.addEventListener("click", function (e) {
          app.deleteCar(car.id);
          app.getCars();
        });

        return $button;
      },

      deleteCar: function (id) {
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", "http://localhost:3100/car");
        xhr.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        xhr.send(`id=${id}`);

        console.log("Removendo veículo...");
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            console.log("Veículo removido", xhr.responseText);
          }
        };
      },

      insertNewCar: function () {
        var [image, brand, model, year, plate, color] = app.getFormValues();

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3100/car");
        xhr.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        xhr.send(
          `image=${image}&brand=${brand}&model=${model}&year=${year}&plate=${plate}&color=${color}`
        );

        console.log("Cadastrando veículo...");
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            console.log("Veículo cadastrado", xhr.responseText);
          }
        };
      },

      getFormValues: function () {
        return [
          $image.get()[0].value,
          $brand.get()[0].value,
          $model.get()[0].value,
          $year.get()[0].value,
          $plate.get()[0].value,
          $color.get()[0].value,
        ];
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
