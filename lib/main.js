"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

require('babel-polyfill');

$(document).ready(function () {
    $("#create-new-address-link").click(function (event) {
        event.preventDefault();

        show_address_creation_window();
    });

    load_grid_relationships();
});

function bind_commands() {
    grid_data = $(grid_relationships).data("kendoGrid");

    $("#filter-name").off("keyup");
    $("#filter-name").off("focus");
    $("#clear-filters").off("click");

    $("#filter-name").keyup(function () {
        applyFilter(grid_data, "Name_VC", $(this).val());

        if (grid_data.dataSource.view().length === 0) {
            $("#container-address-search").removeClass("hidden");
        } else {
            $("#container-address-search").addClass("hidden");
        }
    });

    $("#filter-name").focus(function () {
        if (grid_data.dataSource.view().length === 0) {
            $("#container-address-search").removeClass("hidden");
        } else {
            $("#container-address-search").addClass("hidden");
        }
    });

    $("#clear-filters").click(function () {
        $("#filter-name").val(null);

        clearFilters(grid_data);
    });
}

function score_as_percentage(value, cap) {
    if (typeof cap === "undefined") {
        cap = 200;
    }

    var percentage = value / cap * 100;

    return value / cap * 100 + "%";
}

function match_template(entity_id) {
    var template = '<a href="#" class="matches-select" data-toggle="tooltip" data-placement="bottom" data-container="body" title="Select this Address" data-id="' + entity_id + '"><i class="fas fa-check-square" aria-hidden="true"></i></a>';

    return template;
}

function load_grid_relationships() {
    var path = 'ajax/addresses/shipping_relationships_s.php';

    var columns = [{
        field: "Name_VC",
        title: "Name"

    }, {
        field: "Address1_VC",
        title: "Address"

    }, {
        field: "City_VC",
        title: "City"

    }, {
        field: "StPv_CD",
        title: "State"

    }, {
        field: "PostCode_VC",
        title: "Postal Code"

    }, {
        field: "Ctry_CD",
        title: "Country"

    }];

    var loading_locations = loading_dialog({
        title: "Loading Addresses",
        random: true

    });

    create_kendo_grid(grid_relationships, path, columns, {
        autosizecolumns: false,
        groupable: false,
        scrollable: {
            virtual: true
        },
        sortable: true,
        filterable: false,
        pageable: {
            numeric: false,
            previousNext: false,
            messages: {
                display: "Showing {2} data items"
            }
        },
        event_grid_initialized: function event_grid_initialized() {
            loading_dialog_hide(loading_locations);
            bind_commands();
        },
        event_row_selection: function event_row_selection() {},
        event_double_click: function event_double_click(data) {}

    });
}

function load_matches(name, address1, address2, city, state, postal, country, callback) {
    var path = 'ajax/addresses/address_alias_find_s.php';

    var columns = [{
        title: "Select",
        template: "#= match_template(Entity_ID) #",
        attributes: {
            "class": "text-center-important"

        }

    }, {
        field: "Entity_ID",
        hidden: true

    }, {
        field: "Name_Address_VC",
        title: "Address"

    }, {
        field: "StreetScore",
        title: "Address Score",
        template: "#= score_as_percentage(StreetScore) #"

    }, {
        field: "NameScore",
        title: "Name Score",
        template: "#= score_as_percentage(NameScore) #"

    }];

    create_kendo_grid(grid_matches, path, columns, {
        ajax_param: {
            name: name,
            address1: address1,
            address2: address2,
            city: city,
            state: state,
            postal: postal,
            country: country

        },
        groupable: false,
        sortable: true,
        filterable: false,
        pageable: {
            numeric: false,
            previousNext: false

        },
        event_grid_initialized: function event_grid_initialized() {
            if (typeof callback === "function") {
                callback();
            }
        },
        event_row_selection: function event_row_selection() {},
        event_double_click: function event_double_click(data) {}

    });
}

function show_address_creation_window() {
    $("#container-address-search").addClass("hidden");

    (function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var steps, currentStep, result;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            steps = ['1', '2'];
                            currentStep = void 0;


                            swal.setDefaults({
                                confirmButtonText: 'Forward',
                                cancelButtonText: 'Back',
                                showCloseButton: true,
                                progressSteps: steps

                            });

                            currentStep = 0;

                        case 4:
                            if (!(currentStep < 2)) {
                                _context.next = 35;
                                break;
                            }

                            result = null;
                            _context.t0 = currentStep;
                            _context.next = _context.t0 === 0 ? 9 : _context.t0 === 1 ? 13 : 17;
                            break;

                        case 9:
                            _context.next = 11;
                            return swal_address_entry(currentStep);

                        case 11:
                            result = _context.sent;
                            return _context.abrupt("break", 17);

                        case 13:
                            _context.next = 15;
                            return swal_address_check(currentStep);

                        case 15:
                            result = _context.sent;
                            return _context.abrupt("break", 17);

                        case 17:
                            if (!result.value) {
                                _context.next = 26;
                                break;
                            }

                            currentStep++;

                            //show swal on last step

                            if (!(currentStep === 2)) {
                                _context.next = 24;
                                break;
                            }

                            swal.resetDefaults();
                            if (entity_id == 0 || entity_id == "" || entity_id == null) {
                                //show swal to create entity
                                swal("create");
                            } else {}
                            //swal(entity_id);

                            //console.log(entity_id);
                            entity_id = 0;

                            return _context.abrupt("break", 35);

                        case 24:
                            _context.next = 33;
                            break;

                        case 26:
                            if (!(result.dismiss === 'cancel')) {
                                _context.next = 30;
                                break;
                            }

                            currentStep--;

                            _context.next = 33;
                            break;

                        case 30:
                            if (!(result.dismiss === "close")) {
                                _context.next = 33;
                                break;
                            }

                            swal.resetDefaults();
                            return _context.abrupt("break", 35);

                        case 33:
                            _context.next = 4;
                            break;

                        case 35:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function backAndForth() {
            return _ref.apply(this, arguments);
        }

        return backAndForth;
    })()();
}

function swal_address_entry(step) {
    var swal_alert = swal({
        title: 'Create Address',
        showCancelButton: step > 0,
        currentProgressStep: step,
        html: '<div id="create-new-address-form-swal"></div>',
        width: 600,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Check Address',
        showLoaderOnConfirm: true,
        onOpen: function onOpen() {
            $("#create-new-address-form-swal").load("templates/addresses/template_create_address.php", function (response, status, xhr) {
                $(".selectpicker").selectpicker();

                $("#add-country").change(function () {
                    var country_id = $(this).val();

                    populate_states(country_id, "#add-state", function () {
                        //if typed state is something other than null then set it
                        if (typed_state_id != null) {
                            $("#add-state").selectpicker('val', typed_state_id);
                        }
                    });
                });

                //if typed values are something, then lets set the window back to what it was
                //state is handled above
                if (typed_name != null) {
                    $("#add-name").val(typed_name);
                    $("#add-address").val(typed_address1);
                    $("#add-address2").val(typed_address2);
                    $("#add-city").val(typed_city);
                    $("#add-zip ").val(typed_postal);
                    $("#add-country").selectpicker('val', typed_country_id); //this calls the change function defined above, then set state
                } else {
                    $("#add-name").val($("#filter-name").val());
                    $("#add-country").change(); //run for the first time just to load the US states
                }

                test_create_address_paramaters(); //uncomment this to automatically provide values
            });
        }, preConfirm: function preConfirm(text) {
            return new Promise(function (resolve) {
                var errors = check_address_entries();

                //set variables in order to pass into alias lookup in a minute
                typed_name = $("#add-name").val();
                typed_address1 = $("#add-address").val();
                typed_address2 = $("#add-address2").val();
                typed_city = $("#add-city").val();
                typed_state = $("#add-state").find(":selected").text();
                typed_state_id = $("#add-state").val();
                typed_postal = $("#add-zip").val();
                typed_country = $("#add-country").find(":selected").attr("data-cd");
                typed_country_id = $("#add-country").val();

                if (errors.length > 0) {
                    swal.showValidationError(errors.join("<br>"));
                }

                resolve();
            });
        }

    });

    return swal_alert;
}

function swal_address_check(step) {
    var swal_alert = swal({
        title: 'Checking for potential Matches',
        showCancelButton: step > 0,
        currentProgressStep: step,
        html: 'If one of these Addresses are close to your search, then click the button next to the Address to choose it instead of creating a new one<br><br><div id="grid-alias-matches"></div>',
        width: 700,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Create anyway!',
        reverseButtons: true,
        onOpen: function onOpen() {
            swal.showLoading();

            load_matches(typed_name, typed_address1, typed_address2, typed_city, typed_state, typed_postal, typed_country, function () {
                swal.hideLoading();

                entity_id = 0;

                $(".matches-select").click(function () {
                    entity_id = $(this).attr("data-id");

                    swal.clickConfirm();
                });
            });
        }, preConfirm: function preConfirm(text) {
            return new Promise(function (resolve) {
                resolve();
            });
        }

    });

    return swal_alert;
}

function check_address_entries() {
    var errors = [];

    if (check_name() == false) {
        errors.push("You need to enter a name");
    }

    if (check_postcode() == false) {
        errors.push("You need to enter a Postal Code");
    }

    if (check_address() == false) {
        errors.push("You need to provide an Address");
    }

    if (check_city() == false) {
        errors.push("You need to provide a City");
    }

    return errors;
}

function check_name() {
    var element = $("#create-new-address-form-swal #add-name");

    if (element.val() == "" || element.val() == null) {
        set_form_group_status(element, "error", ".validation-group");
        return false;
    } else {
        remove_form_group_status(element, ".validation-group");
        return true;
    }
}

function check_postcode() {
    var element = $("#create-new-address-form-swal #add-zip");

    if (element.val() == "" || element.val() == null) {
        set_form_group_status(element, "error", ".validation-group");
        return false;
    } else {
        remove_form_group_status(element, ".validation-group");
        return true;
    }
}

function check_address() {
    var element = $("#create-new-address-form-swal #add-address");

    if (element.val() == "" || element.val() == null) {
        set_form_group_status(element, "error", ".validation-group");
        return false;
    } else {
        remove_form_group_status(element, ".validation-group");
        return true;
    }
}

function check_city() {
    var element = $("#create-new-address-form-swal #add-city");

    if (element.val() == "" || element.val() == null) {
        set_form_group_status(element, "error", ".validation-group");
        return false;
    } else {
        remove_form_group_status(element, ".validation-group");
        return true;
    }
}

function populate_states(country_id, state_element, callback) {
    var data = {
        ctry_id: country_id

    };

    ajax_json_post("ajax/stpv_by_ctry_s.php", data, function (response) {
        //success
        $(state_element).empty();

        if (response.length > 0) {
            $.each(response, function (k, v) {
                $(state_element).append("<option value=" + v.StPv_ID + " data-ctry-id=" + v.Ctry_ID + " >" + v.StPv + "</option");
            });
        }

        $(state_element).selectpicker('refresh');
    }, function () {}, function () {
        if (typeof callback === "function") {
            callback();
        }
    });
}

function test_create_address_paramaters() {
    $("#add-name").val("Sportsman Dist");
    $("#add-address").val("2300 E Turner");
    $("#add-address2").val("");
    $("#add-city").val("Springfield");
    $("#add-zip ").val("65803");

    typed_state_id = 28;
    $("#add-country").selectpicker('val', 1); //this calls the change function defined above, then set state

}