/*
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

describe('storage()', () => {
  describe('namespace', () => {
    it('accessible from firebase.app()', () => {
      const app = firebase.app();
      should.exist(app.storage);
      app.storage().app.should.equal(app);
    });

    it('supports multiple apps', async () => {
      firebase.storage().app.name.should.equal('[DEFAULT]');

      firebase
        .storage(firebase.app('secondaryFromNative'))
        .app.name.should.equal('secondaryFromNative');

      firebase
        .app('secondaryFromNative')
        .storage()
        .app.name.should.equal('secondaryFromNative');
    });

    it('supports specifying a bucket', async () => {
      const bucket = 'gs://react-native-firebase-testing';
      const defaultInstance = firebase.storage();
      defaultInstance.app.name.should.equal('[DEFAULT]');
      should.equal(
        defaultInstance._customUrlOrRegion,
        'gs://react-native-firebase-testing.appspot.com',
      );
      firebase.storage().app.name.should.equal('[DEFAULT]');
      const instanceForBucket = firebase.app().storage(bucket);
      instanceForBucket._customUrlOrRegion.should.equal(bucket);
    });

    it('throws an error if an invalid bucket url is provided', async () => {
      const bucket = 'invalid://react-native-firebase-testing';
      try {
        firebase.app().storage(bucket);
        return Promise.reject(new Error('Did not throw.'));
      } catch (error) {
        error.message.should.containEql(`bucket url must be a string and begin with 'gs://'`);
        return Promise.resolve();
      }
    });

    it('uploads to a custom bucket when specified', async () => {
      const jsonDerulo = JSON.stringify({ foo: 'bar' });
      const bucket = 'gs://react-native-firebase-testing';

      const uploadTaskSnapshot = await firebase
        .app()
        .storage(bucket)
        .ref('/putStringCustomBucket.json')
        .putString(jsonDerulo, firebase.storage.StringFormat.RAW, {
          contentType: 'application/json',
        });

      uploadTaskSnapshot.state.should.eql(firebase.storage.TaskState.SUCCESS);
      uploadTaskSnapshot.bytesTransferred.should.eql(uploadTaskSnapshot.totalBytes);
      uploadTaskSnapshot.metadata.should.be.an.Object();
    });
  });

  describe('setMaxOperationRetryTime', () => {
    it('should set', async () => {
      await firebase.storage().setMaxOperationRetryTime(100000);
    });

    it('throws if time is not a number value', async () => {
      try {
        await firebase.storage().setMaxOperationRetryTime('im a teapot');
        return Promise.reject(new Error('Did not throw'));
      } catch (error) {
        error.message.should.containEql(`'time' must be a number value`);
        return Promise.resolve();
      }
    });
  });

  describe('setMaxUploadRetryTime', () => {
    it('should set', async () => {
      await firebase.storage().setMaxUploadRetryTime(100000);
    });

    it('throws if time is not a number value', async () => {
      try {
        await firebase.storage().setMaxUploadRetryTime('im a teapot');
        return Promise.reject(new Error('Did not throw'));
      } catch (error) {
        error.message.should.containEql(`'time' must be a number value`);
        return Promise.resolve();
      }
    });
  });

  describe('setMaxDownloadRetryTime', () => {
    it('should set', async () => {
      await firebase.storage().setMaxDownloadRetryTime(100000);
    });

    it('throws if time is not a number value', async () => {
      try {
        await firebase.storage().setMaxDownloadRetryTime('im a teapot');
        return Promise.reject(new Error('Did not throw'));
      } catch (error) {
        error.message.should.containEql(`'time' must be a number value`);
        return Promise.resolve();
      }
    });
  });
});
