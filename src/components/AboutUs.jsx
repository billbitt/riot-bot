import React from 'react';

const AboutUs = () => {
  return (
    <div>
      <div className="row">
        <div className="column col-lg-12">
          <div className="row">
            <div className="column col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-subtitle mb-2 text-muted">What we do</h5>
                  <p className="card-text">Brilliant.legal provides self-help tools that regular people can use to solve simple legal problems. Built by lawyers, we use the web to harness technology and deliver tools that can be accessed from any where, any time.</p>
                </div>
              </div>
            </div>
            <div className="column col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-subtitle mb-2 text-muted">Who we can help</h5>
                  <p className="card-text">Many people fall into a growing "justice gap" because they do not have the ability to hire a lawyer. Brilliant.legal aims to serve those in this gap, by leveraging technology to provide affordable tools so they can help themselves.</p>
                </div>
              </div>
            </div>
            <div className="column col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-subtitle mb-2 text-muted">How to use</h5>
                  <p className="card-text">Click below to chat with our custom A.I. software about your legal problem. The software will help you determine if your rights have been violated, and can assemble custom legal documents specifically prepared for you.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

module.exports = AboutUs;
