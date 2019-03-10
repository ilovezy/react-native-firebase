/**
 * Copyright (c) 2016-present Invertase Limited & Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this library except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

#import <React/RCTUtils.h>
#import <Firebase/Firebase.h>

#import "RNFBCrashlyticsModule.h"
#import <RNFBApp/RNFBSharedUtils.h>


@implementation RNFBCrashlyticsModule
#pragma mark -
#pragma mark Module Setup

  RCT_EXPORT_MODULE(RNFBCrashlyticsModule);

  - (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
  }

#pragma mark -
#pragma mark Firebase Crashlytics Methods

RCT_EXPORT_METHOD(setPerformanceCollectionEnabled:
                  (BOOL *) enabled
                  resolver:
                  (RCTPromiseResolveBlock) resolve
                  rejecter:
                  (RCTPromiseRejectBlock) reject) {
  resolve([NSNull null]);
}

@end
