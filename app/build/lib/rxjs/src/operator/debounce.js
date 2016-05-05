System.register(['../OuterSubscriber', '../util/subscribeToResult'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var OuterSubscriber_1, subscribeToResult_1;
    var DebounceOperator, DebounceSubscriber;
    /**
     * Returns the source Observable delayed by the computed debounce duration,
     * with the duration lengthened if a new source item arrives before the delay
     * duration ends.
     * In practice, for each item emitted on the source, this operator holds the
     * latest item, waits for a silence as long as the `durationSelector` specifies,
     * and only then emits the latest source item on the result Observable.
     * @param {function} durationSelector function for computing the timeout duration for each item.
     * @return {Observable} an Observable the same as source Observable, but drops items.
     * @method debounce
     * @owner Observable
     */
    function debounce(durationSelector) {
        return this.lift(new DebounceOperator(durationSelector));
    }
    exports_1("debounce", debounce);
    return {
        setters:[
            function (OuterSubscriber_1_1) {
                OuterSubscriber_1 = OuterSubscriber_1_1;
            },
            function (subscribeToResult_1_1) {
                subscribeToResult_1 = subscribeToResult_1_1;
            }],
        execute: function() {
            DebounceOperator = (function () {
                function DebounceOperator(durationSelector) {
                    this.durationSelector = durationSelector;
                }
                DebounceOperator.prototype.call = function (subscriber, source) {
                    return source._subscribe(new DebounceSubscriber(subscriber, this.durationSelector));
                };
                return DebounceOperator;
            }());
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            DebounceSubscriber = (function (_super) {
                __extends(DebounceSubscriber, _super);
                function DebounceSubscriber(destination, durationSelector) {
                    _super.call(this, destination);
                    this.durationSelector = durationSelector;
                    this.hasValue = false;
                    this.durationSubscription = null;
                }
                DebounceSubscriber.prototype._next = function (value) {
                    try {
                        var result = this.durationSelector.call(this, value);
                        if (result) {
                            this._tryNext(value, result);
                        }
                    }
                    catch (err) {
                        this.destination.error(err);
                    }
                };
                DebounceSubscriber.prototype._complete = function () {
                    this.emitValue();
                    this.destination.complete();
                };
                DebounceSubscriber.prototype._tryNext = function (value, duration) {
                    var subscription = this.durationSubscription;
                    this.value = value;
                    this.hasValue = true;
                    if (subscription) {
                        subscription.unsubscribe();
                        this.remove(subscription);
                    }
                    subscription = subscribeToResult_1.subscribeToResult(this, duration);
                    if (!subscription.isUnsubscribed) {
                        this.add(this.durationSubscription = subscription);
                    }
                };
                DebounceSubscriber.prototype.notifyNext = function (outerValue, innerValue, outerIndex, innerIndex, innerSub) {
                    this.emitValue();
                };
                DebounceSubscriber.prototype.notifyComplete = function () {
                    this.emitValue();
                };
                DebounceSubscriber.prototype.emitValue = function () {
                    if (this.hasValue) {
                        var value = this.value;
                        var subscription = this.durationSubscription;
                        if (subscription) {
                            this.durationSubscription = null;
                            subscription.unsubscribe();
                            this.remove(subscription);
                        }
                        this.value = null;
                        this.hasValue = false;
                        _super.prototype._next.call(this, value);
                    }
                };
                return DebounceSubscriber;
            }(OuterSubscriber_1.OuterSubscriber));
        }
    }
});
//# sourceMappingURL=debounce.js.map