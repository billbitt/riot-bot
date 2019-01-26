import React from 'react';

const AboutSecurityBot = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h4>About the Security Deposit Bot</h4>
        <p>California has a housing crisis, and landlords are able to take advantage of uneducated renters due to high demand.</p>
        <p>Our goal is to protect renters who can't hire expensive lawyers, by providing affordable self-help tools that utilize cutting edge technology.</p>
        <h4>The Issue</h4>
        <p>A common problem is that landlords often keep a renter's security deposit, and the renter does not know how to get it back.</p>
        <h4>Our Solution</h4>
        <p> Our <a href="m.me/LetsBeBrilliant">Security Deposit Bot</a> is designed to solve this problem.  By answering a few simple questions, the bot can tell renters whether their security deposit was wrongfuly withheld.  If it was wrongfully withheld, the bot can also generate a demand letter for the renter, which the renter can use to request their security deposit back from their landlord.</p>
        <h4>The Future</h4>
        <p>The Security Deposit Bot is our first tool, and is currently only available in California.  We will be expanding to more states with a variety of similar self help tools soon.  Sign up <a href="">here</a> to be notified of future products and additional states.</p>
        </div>
    </div>
  );
}

module.exports = AboutSecurityBot;
