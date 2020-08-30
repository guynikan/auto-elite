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
    var $tbody = new DOM('[data-js="tbody"]');

    return {
      init: function () {
        app.initEvents();
        app.companyInfo();
        app.getCars();
      },

      initEvents: function () {
        $form.on("submit", this.handleSubmit);
        app.getCars();
        var $button = new DOM('input[type="button"]');
        console.log($button);
      },

      handleSubmit: function (e) {
        e.preventDefault();
        app.insertNewCar();
        app.getCars();
      },

      getCars: function () {
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

      createCarData: function (cars) {
        console.log("here", cars, "tbo", $tbody);
        var data = cars.map((car) => {
          return `<tr id=${car.id}>
           <td>${car.image}</td>
           <td>${car.brand}</td>
           <td>${car.model}</td>
           <td>${car.year}</td>
           <td>${car.plate}</td>
           <td>${car.color}</td>
           <td><input type="button"  value="Remover"></td>
           </tr>`;
        });

        $tbody.get()[0].innerHTML = data.join("");
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
