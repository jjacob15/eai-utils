import React from 'react';

export default class extends React.Component {
  render() {
    return (
      <form className="wizard-form wizard clearfix" id="basic-forms" action="#" role="application">
        <div className="steps clearfix">
          <ul role="tablist">
            <li role="tab" className="first current" aria-disabled="false" aria-selected="true">
              <a id="basic-forms-t-0" href="#basic-forms-h-0" aria-controls="basic-forms-p-0">
                <span className="current-info audible">current step: </span>
                <span className="number">1.</span> Registration{' '}
              </a>
            </li>
            <li role="tab" className="disabled" aria-disabled="true">
              <a id="basic-forms-t-1" href="#basic-forms-h-1" aria-controls="basic-forms-p-1">
                <span className="number">2.</span> General information{' '}
              </a>
            </li>
            <li role="tab" className="disabled" aria-disabled="true">
              <a id="basic-forms-t-2" href="#basic-forms-h-2" aria-controls="basic-forms-p-2">
                <span className="number">3.</span> Education{' '}
              </a>
            </li>
            <li role="tab" className="disabled last" aria-disabled="true">
              <a id="basic-forms-t-3" href="#basic-forms-h-3" aria-controls="basic-forms-p-3">
                <span className="number">4.</span> Work experience{' '}
              </a>
            </li>
          </ul>
        </div>
        <div className="content clearfix">
          <h3 id="basic-forms-h-0" tabIndex="-1" className="title current">
            {' '}
            Registration{' '}
          </h3>
          <fieldset
            id="basic-forms-p-0"
            role="tabpanel"
            aria-labelledby="basic-forms-h-0"
            className="body current"
            aria-hidden="false">
            <div className="form-group row">
              <div className="col-sm-12">
                <label for="userName-2" className="block">
                  User name *
                </label>
              </div>
              <div className="col-sm-12">
                <input id="userName-2a" name="userName" type="text" className=" form-control" />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-12">
                <label for="email-2" className="block">
                  Email *
                </label>
              </div>
              <div className="col-sm-12">
                <input id="email-2a" name="email" type="email" className=" form-control" />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-12">
                <label for="password-2" className="block">
                  Password *
                </label>
              </div>
              <div className="col-sm-8 col-lg-10">
                <input id="password-2a" name="password" type="password" className="form-control " />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-12">
                <label for="confirm-2" className="block">
                  Confirm Password *
                </label>
              </div>
              <div className="col-sm-12">
                <input id="confirm-2a" name="confirm" type="password" className="form-control " />
              </div>
            </div>
          </fieldset>
          <h3 id="basic-forms-h-1" tabIndex="-1" className="title">
            {' '}
            General information{' '}
          </h3>
          <fieldset
            id="basic-forms-p-1"
            role="tabpanel"
            aria-labelledby="basic-forms-h-1"
            className="body"
            aria-hidden="true">
            <div className="form-group row">
              <div className="col-sm-12">
                <label for="name-2" className="block">
                  First name *
                </label>
              </div>
              <div className="col-sm-12">
                <input id="name-2a" name="name" type="text" className="form-control" />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-12">
                <label for="surname-2" className="block">
                  Last name *
                </label>
              </div>
              <div className="col-sm-12">
                <input id="surname-2a" name="surname" type="text" className="form-control" />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-12">
                <label for="phone-2" className="block">
                  Phone #
                </label>
              </div>
              <div className="col-sm-12">
                <input id="phone-2a" name="phone" type="number" className="form-control phone" />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-12">
                <label for="date" className="block">
                  Date Of Birth
                </label>
              </div>
              <div className="col-sm-12">
                <input id="datea" name="Date Of Birth" type="text" className="form-control date-control" />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-12">Select Country</div>
              <div className="col-sm-12">
                <select className="form-control required">
                  <option>Select State</option>
                  <option>Gujarat</option>
                  <option>Kerala</option>
                  <option>Manipur</option>
                  <option>Tripura</option>
                  <option>Sikkim</option>
                </select>
              </div>
            </div>
          </fieldset>
          <h3 id="basic-forms-h-2" tabIndex="-1" className="title">
            {' '}
            Education{' '}
          </h3>
          <fieldset
            id="basic-forms-p-2"
            role="tabpanel"
            aria-labelledby="basic-forms-h-2"
            className="body"
            aria-hidden="true">
            <div className="form-group row">
              <div className="col-sm-12">
                <label for="University-2" className="block">
                  University
                </label>
              </div>
              <div className="col-sm-12">
                <input id="University-2a" name="University" type="text" className="form-control required" />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-12">
                <label for="Country-2" className="block">
                  Country
                </label>
              </div>
              <div className="col-sm-12">
                <input id="Country-2a" name="Country" type="text" className="form-control required" />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-12">
                <label for="Degreelevel-2" className="block">
                  Degree level #
                </label>
              </div>
              <div className="col-sm-12">
                <input id="Degreelevel-2a" name="Degree level" type="text" className="form-control required phone" />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-12">
                <label for="datejoin" className="block">
                  Date Join
                </label>
              </div>
              <div className="col-sm-12">
                <input id="datejoina" name="Date Of Birth" type="text" className="form-control required" />
              </div>
            </div>
          </fieldset>
          <h3 id="basic-forms-h-3" tabIndex="-1" className="title">
            {' '}
            Work experience{' '}
          </h3>
          <fieldset
            id="basic-forms-p-3"
            role="tabpanel"
            aria-labelledby="basic-forms-h-3"
            className="body"
            aria-hidden="true">
            <div className="form-group row">
              <div className="col-sm-12">
                <label for="Company-2" className="block">
                  Company:
                </label>
              </div>
              <div className="col-sm-12">
                <input id="Company-2a" name="Company:" type="text" className="form-control required" />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-12">
                <label for="CountryW-2" className="block">
                  Country
                </label>
              </div>
              <div className="col-sm-12">
                <input id="CountryW-2a" name="Country" type="text" className="form-control required" />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-12">
                <label for="Position-2" className="block">
                  Position
                </label>
              </div>
              <div className="col-sm-12">
                <input id="Position-2a" name="Position" type="text" className="form-control required" />
              </div>
            </div>
          </fieldset>
        </div>
        <div className="actions clearfix">
          <ul role="menu" aria-label="Pagination">
            <li className="disabled" aria-disabled="true">
              <a href="#previous" role="menuitem">
                Previous
              </a>
            </li>
            <li aria-hidden="false" aria-disabled="false">
              <a href="#next" role="menuitem">
                Next
              </a>
            </li>
            <li aria-hidden="true">
              <a href="#finish" role="menuitem">
                Finish
              </a>
            </li>
          </ul>
        </div>
      </form>
    );
  }
}
