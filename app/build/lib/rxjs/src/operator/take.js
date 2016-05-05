System.register(['../Subscriber', '../util/ArgumentOutOfRangeError', '../observable/EmptyObservable'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Subscriber_1, ArgumentOutOfRangeError_1, EmptyObservable_1;
    var TakeOperator, TakeSubscriber;
    /**
     * @throws {ArgumentOutOfRangeError} When using `take(i)`, it delivers an
     * ArgumentOutOrRangeError to the Observer's `error` callback if `i < 0`.
     * @param total
     * @return {any}
     * @method take
     * @owner Observable
     */
    function take(total) {
        if (total === 0) {
            return new EmptyObservable_1.EmptyObservable();
        }
        else {
            return this.lift(new TakeOperator(total));
        }
    }
    exports_1("take", take);
    return {
        setters:[
            function (Subscriber_1_1) {
                Subscriber_1 = Subscriber_1_1;
            },
            function (ArgumentOutOfRangeError_1_1) {
                ArgumentOutOfRangeError_1 = ArgumentOutOfRangeError_1_1;
            },
            function (EmptyObservable_1_1) {
                EmptyObservable_1 = EmptyObservable_1_1;
            }],
        execute: function() {
            TakeOperator = (function () {
                function TakeOperator(total) {
                    this.total = total;
                    if (this.total < 0) {
                        throw new ArgumentOutOfRangeError_1.ArgumentOutOfRangeError;
                    }
                }
                TakeOperator.prototype.call = function (subscriber, source) {
                    return source._subscribe(new TakeSubscriber(subscriber, this.total));
                };
                return TakeOperator;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            TakeSubscriber = (function (_super) {
                __extends(TakeSubscriber, _super);
                function TakeSubscriber(destination, total) {
                    _super.call(this, destination);
                    this.total = total;
                    this.count = 0;
                }
                TakeSubscriber.prototype._next = function (value) {
                    var total = this.total;
                    if (++this.count <= total) {
                        this.destination.next(value);
                        if (this.count === total) {
                            this.destination.complete();
                            this.unsubscribe();
                        }
                    }
                };
                return TakeSubscriber;
            }(Subscriber_1.Subscriber));
        }
    }
});
//# sourceMappingURL=take.js.map