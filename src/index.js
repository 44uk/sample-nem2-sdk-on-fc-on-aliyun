const nem = require('nem2-sdk');
const op = require('rxjs/operators');

const API_URL = 'http://catapult-test.44uk.net:3000';
const RAW_ADDRESS = 'SCLI4QLMLQB7OCWKEMT267QTYXHNK6QAOJZ5A3PG';

const accountHttp = new nem.AccountHttp(API_URL);
const mosaicHttp = new nem.MosaicHttp(API_URL);
const namespaceHttp = new nem.NamespaceHttp(API_URL);
const mosaicService = new nem.MosaicService(accountHttp, mosaicHttp, namespaceHttp);
const address = nem.Address.createFromRawAddress(RAW_ADDRESS)

module.exports.handler = function(_event, _context, callback) {
  mosaicService.mosaicsAmountViewFromAddress(address)
    .pipe(
      op.mergeMap(_ => _),
      op.filter(mo => mo.fullName() === 'nem:xem')
    )
    .subscribe(data => {
      callback(null, data.amount.compact())
    })
  ;
}
